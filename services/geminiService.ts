
// Service mocked for design and optimization phase.
// Real AI integration to be re-enabled for production.

export const generateListingDescription = async (
  make: string,
  model: string,
  year: string,
  features: string
): Promise<string> => {
  // Simulate API latency
  await new Promise(resolve => setTimeout(resolve, 1500));

  // Generate a realistic looking mock response based on inputs
  return `**Experience the Unmatched Performance of the ${year} ${make} ${model}**

Elevate your daily drive with this exceptional ${year} ${make} ${model}. Designed for those who refuse to compromise, this vehicle seamlessly blends power, precision, and luxury into one stunning package.

**Key Features:**
${features.split(',').map(f => `• ${f.trim()}`).join('\n')}

Whether you're navigating tight city streets or conquering the open highway, the ${model} delivers confidence and style at every turn. Its premium interior craftsmanship ensures that you and your passengers travel in absolute comfort.

**Don't just drive—arrive.** Schedule your test drive today and experience why the ${make} ${model} sets the standard for its class.`;
};
