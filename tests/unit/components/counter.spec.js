import { shallowMount, mount } from "@vue/test-utils";
import Counter from "@/components/Counter";
describe("Counter Component", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(Counter);
  });

  // test("debe de hacer match con el snapshot", () => {
  //   expect(wrapper.html()).toMatchSnapshot();
  // });

  test("h2 debe tener el valor por defecto", () => {
    expect(wrapper.find("h2").exists()).toBe(true);
    const h2 = wrapper.find("h2");
    expect(h2.text()).toBe("Counter");
  });

  test("el valor por defecto debe de ser 100 en el <p>", () => {
    const pTags = wrapper.find('[data-testid="counter"]').text();
    expect(pTags).toBe("100");
  });

  test("debe incrementar y decrementar el contador", async () => {
    const [incrementButton, decrementButton] = wrapper.findAll("button");

    await incrementButton.trigger("click");
    await incrementButton.trigger("click");
    await incrementButton.trigger("click");
    await decrementButton.trigger("click");
    await decrementButton.trigger("click");

    const afterValue = wrapper.find('[data-testid="counter"]').text();
    expect(afterValue).toBe("101");
  });

  test("debe establecer el valor por defecto", () => {
    const { start } = wrapper.props();
    const value = wrapper.find('[data-testid="counter"]').text();
    expect(Number(value)).toBe(start);
  });

  test("debe de mostrar la prop title", () => {
    const titleProp = "Hola Mundo!";
    const wrapper = shallowMount(Counter, {
      props: {
        title: titleProp,
      },
    });
    const h2 = wrapper.find("h2");
    expect(h2.text()).toBe(titleProp);
  });
});
