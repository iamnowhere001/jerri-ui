const requireComponent = require.context(
  '.',
  true,
  /.vue$/
)

export default requireComponent.keys().reduce((prev, modulePath) => {
  const value = requireComponent(modulePath);
  const component = value.default;
  if (component && component.name) {
    prev.push({
      path: `/${component.name}`,
      name: component.name,
      component,
      squareLabel: component.squareLabel
    });
  }
  return prev;
}, []);
