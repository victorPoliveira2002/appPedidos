import AsyncStorage from "@react-native-async-storage/async-storage";

export const carregarPedidos = async () => {
  try {
    const pedidosSalvos = await AsyncStorage.getItem("pedidos");
    return pedidosSalvos !== null ? JSON.parse(pedidosSalvos) : [];
  } catch (error) {
    console.log("Erro ao carregar pedidos:", error);
    return [];
  }
};

export const salvarPedidos = async (pedidos) => {
  try {
    await AsyncStorage.setItem("pedidos", JSON.stringify(pedidos));
  } catch (error) {
    console.log("Erro ao salvar pedidos:", error);
  }
};
