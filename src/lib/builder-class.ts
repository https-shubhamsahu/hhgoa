export function getBuilderClass(role: string = '', stack: string = ''): string {
  const text = `${role} ${stack}`.toLowerCase();
  
  if (text.includes('ai') || text.includes('ml') || text.includes('llm') || text.includes('gpt') || text.includes('agent')) {
    return 'THE MODEL TAMER';
  }
  if (text.includes('cyber') || text.includes('sec') || text.includes('hack') || text.includes('audit')) {
    return 'THE SYSTEM BREAKER';
  }
  if (text.includes('front') || text.includes('ui') || text.includes('ux') || text.includes('react') || text.includes('css')) {
    return 'THE PIXEL ARCHITECT';
  }
  if (text.includes('back') || text.includes('api') || text.includes('node') || text.includes('python') || text.includes('go')) {
    return 'THE API FORGER';
  }
  if (text.includes('web3') || text.includes('chain') || text.includes('crypto') || text.includes('solana') || text.includes('eth')) {
    return 'THE CHAIN BUILDER';
  }
  if (text.includes('full') || text.includes('stack')) {
    return 'THE SYSTEM BUILDER';
  }
  if (text.includes('sys') || text.includes('rust') || text.includes('cpp') || text.includes('kernel') || text.includes('infra')) {
    return 'THE CORE ENGINE';
  }
  if (text.includes('design') || text.includes('art') || text.includes('brand')) {
    return 'THE VISUAL SHAPER';
  }

  return 'THE GOA BUILDER';
}
