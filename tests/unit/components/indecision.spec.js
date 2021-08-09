import { shallowMount } from "@vue/test-utils";
import Indecision from "@/components/Indecision";
describe("Indecision Component", () => {
  let wrapper;
  let clgSpy;
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          answer: "yes",
          forced: false,
          image: "https://yesno.wtf/yes/2.gif",
        }),
    })
  );
  beforeEach(() => {
    wrapper = shallowMount(Indecision);
    clgSpy = jest.spyOn(console, "log");

    //jest.clearAllMocks();
  });

  test("debe hacer match con el snapshot del componente", () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  test("escribir en el input no debe de disparar nada (console.log)", async () => {
    const getAnswerSpy = jest.spyOn(wrapper.vm, "getAnswer");

    const input = wrapper.find("input");
    await input.setValue("Hola Mundo");
    expect(clgSpy).toHaveBeenCalledTimes(1);
    expect(getAnswerSpy).not.toHaveBeenCalled();
  });

  test('escribir el simbolo "?" debe de disparar el fetch ', async () => {
    const getAnswerSpy = jest.spyOn(wrapper.vm, "getAnswer");

    const input = wrapper.find("input");
    await input.setValue("Hola Mundo?");

    expect(clgSpy).toHaveBeenCalledTimes(2);
    expect(getAnswerSpy).toHaveBeenCalled();
  });

  test("pruebas en getAnswer", async () => {
    await wrapper.vm.getAnswer();
    const img = wrapper.find("img");
    expect(img.exists()).toBe(true);
    expect(wrapper.vm.img).toBe("https://yesno.wtf/yes/2.gif");
    expect(wrapper.vm.answer).toBe("si!");
  });

  test("pruebas en getAnswer - Fallo en el API ", async () => {
    fetch.mockImplementationOnce(() => Promise.reject("API abajo"));

    await wrapper.vm.getAnswer();

    const img = wrapper.find("img");
    expect(img.exists()).toBe(false);
    expect(wrapper.vm.answer).toBe("No se pudo cargar del API");
  });
});
