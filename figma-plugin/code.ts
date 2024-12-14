// figma.showUI(__html__);

// figma.ui.onmessage = async (msg) => {
//   if (msg.type === "generate-layout") {
//     const config: FigmaGridConfig = msg.config;

//     // Create frame for the grid
//     const frame = figma.createFrame();
//     frame.name = "Bento Grid";
//     frame.resize(
//       config.grid.cellSize * config.grid.columns +
//         config.grid.gap * (config.grid.columns - 1),
//       config.grid.cellSize * config.grid.rows +
//         config.grid.gap * (config.grid.rows - 1)
//     );

//     // Create items
//     config.items.forEach((item) => {
//       const rect = figma.createRectangle();
//       rect.x = item.x;
//       rect.y = item.y;
//       rect.resize(item.width, item.height);
//       rect.cornerRadius = 8;

//       // Set color
//       const [color, shade] = item.color.split("-");
//       // Convert color to Figma color (would need a color mapping function)
//       rect.fills = [{ type: "SOLID", color: convertColor(color, shade) }];

//       frame.appendChild(rect);
//     });

//     figma.viewport.scrollAndZoomIntoView([frame]);
//   }

//   figma.closePlugin();
// };
