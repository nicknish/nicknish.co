import Typography from 'typography';
import KirkhamTheme from 'typography-theme-kirkham';

KirkhamTheme.bodyFontSize = '18px';
KirkhamTheme.baseLineHeight = 1.666;
KirkhamTheme.headerFontFamily = ['Lato', 'sans-serif'];
KirkhamTheme.bodyFontFamily = ['Fira Sans', 'sans-serif'];

const typography = new Typography(KirkhamTheme);

export default typography;
