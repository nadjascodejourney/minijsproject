import { colors, symbols } from "./colors.js";

export const mainMenuTemplate = `
0============================___Main Menu___==================================0
0                                                                             0
0 [${colors.blue}C${colors.reset}]reate - [${colors.green}R${colors.reset}]ead - [${colors.yellow}U${colors.reset}]pdate - [${colors.red}D${colors.reset}]elete - [${colors.magenta}O${colors.reset}]racle - [${colors.blue}Q${colors.reset}]uit 
0                       ${symbols.oktopus} ${symbols.cat}                                                 0
0=============================================================================0
`;

export const storageTemplate = `
0============================___Storage___===================================0
`;

export const subMenuTemplate = `
0============================___Sub Menu___======================================0
0                                                                                0
0 [${colors.blue}B${colors.reset}]ack - [${colors.green}S${colors.reset}]ort                                                               0   
0                                                                                0
0================================================================================0 `;

// Sortiere nach [N]ame, [I]d, [T]ype, [Q]uantity, [W]eight
export const sortMenuTemplate = `
0============================___Sort Menu___======================================0
0                                                                                0
0 [${colors.blue}N${colors.reset}]ame - [${colors.green}I${colors.reset}]d - [${colors.yellow}T${colors.reset}]ype - [${colors.red}Q${colors.reset}]uantity - [${colors.magenta}W${colors.reset}]eight - [${colors.blue}B${colors.reset}]ack 
0                                                                                0
0================================================================================0 `;
