describe("Example Component", () => {
  test("Debe de ser mayor a 10 ", () => {
    // ARREGLAR
    let value = 5;
    // ESTIMUlO
    value = value + 6;
    // OBSERVAR
    expect(value).toBeGreaterThan(10);
  });
});
