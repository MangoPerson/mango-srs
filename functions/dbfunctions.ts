import PocketBase, { Record } from 'pocketbase';
import { TypeOf, z } from 'zod';

const kanjiSchema = z.object({
    character: z.string().length(1),
    ranking: z.number().int(),
    onyomi: z.array(z.string()),
    kunyomi: z.array(z.string()),
    meanings: z.array(z.string()),
});

const vocabSchema = z.object({
    term: z.string(),
    ranking: z.number(),
    readings: z.array(z.string()),
    meanings: z.array(z.string()),
    kanji: z.array(kanjiSchema),
});

const reviewSchema = z.object({
    term_type: z.enum([ 'kanji', 'vocab' ]),
    term_id: z.string(),
    user: z.string(),
    level: z.number().int().gt(0),
    review_time: z.date(),
    notes: z.object({
        readings: z.array(z.string()).optional(),
        meanings: z.array(z.string()).optional(),
        other: z.array(z.string()).optional()
    }),
});

export type Kanji = {
    id: string,
    character: string,
    ranking: number,
    onyomi: string[],
    kunyomi: string[],
    meanings: string[],
}

export type Vocab = {
    id: string,
    term: string,
    ranking: number,
    readings: string[],
    meanings: string[],
    kanji: Kanji[],
}

export type User = {
    id: string,
    username: string,
    email: string,
    name: string,
    avatar: string,
    emailVisibility: string,
}

type PreReview<T extends Kanji | Vocab = Kanji | Vocab> = {
    id: string,
    term_type: 'vocab' | 'kanji',
    level: number,
    review_time: Date,
    notes: {
        readings: T extends Vocab ? 
            string[] :
            {
                onyomi: string[],
                kunyomi: string[]
            },
        meanings: string[],
        other: string[]
    }
}

export type Review<T extends Kanji | Vocab = Kanji | Vocab> = PreReview<T> & {
    term: T,
    user: User,
}

type DBReview<T extends Kanji | Vocab = Kanji | Vocab> = Record & PreReview<T> & {
    term: string,
    user: string,
}

export function matches(reading1: string, reading2: string) {
    return reading1 === reading2;
}

export class ReviewSession {
    readonly pb: PocketBase;

    current: Review[] = [];

    constructor(pb: PocketBase) {
        if (!pb.authStore.isValid) {
            throw Error('PocketBase instance must be authenticated to create a review session');
        }

        this.pb = pb;
    }

    async fetch(amount: number = 5): Promise<Review[]> {
        let reviewData = await this.pb.collection('reviews').getList<DBReview>(1, amount, {
            filter: `review_time > ${Date.now()}`,
            expand: 'user'
        });

        let reviews: Review[] = await Promise.all(reviewData.items.map(async (item) => {
            if (item.term_type === 'kanji') {
                const user = item.expand.user as unknown as User;
                const term = await this.pb.collection('kanji').getOne<Kanji>(item.term);

                const { id, term_type, level, review_time } = item;
                const { notes } = item as DBReview<Kanji>;

                const result: Review<Kanji> = {
                    id,
                    term_type,
                    user,
                    term,
                    level,
                    review_time,
                    notes,
                }

                return result;
            }
            else {
                const user = item.expand.user as unknown as User;
                const term = await this.pb.collection('kanji').getOne<Vocab>(item.term);

                const { id, term_type, level, review_time } = item;
                const { notes } = item as DBReview<Vocab>;

                const result: Review<Vocab> = {
                    id,
                    term_type,
                    user,
                    term,
                    level,
                    review_time,
                    notes,
                }
                
                return result;
            }
        }));

        this.current = reviews;

        return reviews;
    }

    get() {
        return this.current[0];
    }

    next(): Review | undefined {
        return this.current.shift();
    }

    checkNextMeaning(guess: string): boolean {
        const review = this.get();

        return review.term.meanings.some(meaning => meaning === guess) || review.notes.meanings.some(meanings => meanings === guess);
    }

    checkNextReading(guess: string, type: 'onyomi' | 'kunyomi' = 'onyomi'): boolean {
        const review = this.get();

        if (review.term_type === 'vocab') { 
            const vr = review as Review<Vocab>;

            return vr.term.readings.some(reading => matches(reading, guess)) || vr.notes.readings.some(reading => matches(reading, guess));
        }
        else {
            const kr = review as Review<Kanji>;

            return kr.term[type].some(reading => matches(reading, guess)) || kr.notes.readings[type].some(reading => matches(reading, guess));
        }
    }
} 