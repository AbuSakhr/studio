'use server';
/**
 * @fileOverview An AI agent that recommends related products based on the items in the cart.
 *
 * - getRelatedProducts - A function that suggests related products.
 * - RelatedProductsInput - The input type for the getRelatedProducts function.
 * - RelatedProductsOutput - The return type for the getRelatedProducts function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RelatedProductsInputSchema = z.object({
  cartItems: z
    .array(z.string())
    .describe('The list of product names currently in the cart.'),
});
export type RelatedProductsInput = z.infer<typeof RelatedProductsInputSchema>;

const RelatedProductsOutputSchema = z.object({
  relatedProducts: z
    .array(z.string())
    .describe('A list of related product names.'),
});
export type RelatedProductsOutput = z.infer<typeof RelatedProductsOutputSchema>;

export async function getRelatedProducts(input: RelatedProductsInput): Promise<RelatedProductsOutput> {
  return relatedProductsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'relatedProductsPrompt',
  input: {schema: RelatedProductsInputSchema},
  output: {schema: RelatedProductsOutputSchema},
  prompt: `You are a helpful shopping assistant. Given the items currently in the cart, suggest other products that the user might be interested in.

Cart items: {{cartItems}}

Related products:`,
});

const relatedProductsFlow = ai.defineFlow(
  {
    name: 'relatedProductsFlow',
    inputSchema: RelatedProductsInputSchema,
    outputSchema: RelatedProductsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
