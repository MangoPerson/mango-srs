import PocketBase, { Record } from 'pocketbase';
import { z } from 'zod';

const kanji = z.object({
    character: z.string().length(1),
    ranking: z.number().int(),
    onyomi: z.array(z.string()),
    kunyomi: z.array(z.string()),
    meanings: z.array(z.string()),
});

const vocab = z.object({
    term: z.string(),
    ranking: z.number(),
    readings: z.array(z.string()),
    meanings: z.array(z.string()),
    kanji: z.array(kanji),
});

const review = z.object({
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

export type Kanji = z.infer<typeof kanji>;
export type Vocab = z.infer<typeof vocab>;
export type Review = z.infer<typeof review>;

export class ReviewSession {
    readonly pb: PocketBase;

    current: Review[]

    constructor(pb: PocketBase) {
        this.pb = pb;
    }


}

export async function getReviews(pb: PocketBase, amount: number = 1): Promise<Review[]> {
    if (!pb.authStore.isValid) {
        return [];
    }

    const data = await pb.collection('reviews').getFullList<Record & Review>({ expand: 'user' });


    return expand(data);
}