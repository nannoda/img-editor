export function SetupDependencies() {
  const head = document.getElementsByTagName('head')[0];
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.type = 'text/css';
  link.href = 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap';
  link.media = 'all';
  head.appendChild(link);
}