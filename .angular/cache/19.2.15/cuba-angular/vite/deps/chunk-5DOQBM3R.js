// node_modules/@angular/cdk/fesm2022/fake-event-detection-DWOdFTFz.mjs
function isFakeMousedownFromScreenReader(event) {
  return event.buttons === 0 || event.detail === 0;
}
function isFakeTouchstartFromScreenReader(event) {
  const touch = event.touches && event.touches[0] || event.changedTouches && event.changedTouches[0];
  return !!touch && touch.identifier === -1 && (touch.radiusX == null || touch.radiusX === 1) && (touch.radiusY == null || touch.radiusY === 1);
}

export {
  isFakeMousedownFromScreenReader,
  isFakeTouchstartFromScreenReader
};
//# sourceMappingURL=chunk-5DOQBM3R.js.map
