import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const logo = require("../assets/logo.png");

const telaInicial = () => {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [itens, setItens] = useState("");
  const [endereco, setEndereco] = useState("");
  const [horaPedido, setHoraPedido] = useState("");
  const [valorTotal, setValorTotal] = useState("");
  const [formaPagamento, setFormaPagamento] = useState("");
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    async function carregarPedidos() {
      try {
        const pedidosSalvos = await AsyncStorage.getItem("pedidos");
        if (pedidosSalvos) {
          setPedidos(JSON.parse(pedidosSalvos));
        }
      } catch (error) {
        console.log("Erro ao carregar pedidos:", error);
      }
    }
    carregarPedidos();
  }, []);

  const salvarPedidos = async (pedidosAtualizados) => {
    try {
      await AsyncStorage.setItem("pedidos", JSON.stringify(pedidosAtualizados));
    } catch (error) {
      console.log("Erro ao salvar pedidos:", error);
    }
  };

  const adicionarPedido = () => {
    const novoPedido = {
      id: Date.now().toString(),
      nome,
      telefone,
      itens,
      endereco,
      horaPedido,
      valorTotal,
      formaPagamento,
      concluido: false,
    };
    const pedidosAtualizados = [...pedidos, novoPedido];
    setPedidos(pedidosAtualizados);
    salvarPedidos(pedidosAtualizados);
    setNome("");
    setTelefone("");
    setItens("");
    setEndereco("");
    setHoraPedido("");
    setValorTotal("");
    setFormaPagamento("");
  };

  const concluirPedido = (id) => {
    const pedidosAtualizados = pedidos.map((pedido) =>
      pedido.id === id ? { ...pedido, concluido: true } : pedido
    );
    setPedidos(pedidosAtualizados);
    salvarPedidos(pedidosAtualizados);
  };

  const limparLista = async () => {
    try {
      await AsyncStorage.removeItem("pedidos");
      setPedidos([]);
    } catch (error) {
      console.log("Erro ao limpar lista de pedidos:", error);
    }
  };

  const calcularTotalPedidos = () => {
    let total = 0;
    pedidos.forEach((pedido) => {
      const valor = parseFloat(pedido.valorTotal) || 0;
      total += valor;
    });
    return total.toFixed(2);
  };

  const renderPedido = ({ item }) => (
    <View style={[styles.pedidoItem, item.concluido && styles.pedidoConcluido]}>
      <Text style={styles.pedidoInfo}>Nome: {item.nome}</Text>
      <Text style={styles.pedidoInfo}>Telefone: {item.telefone}</Text>
      <Text style={styles.pedidoInfo}>Itens: {item.itens}</Text>
      <Text style={styles.pedidoInfo}>Endereço: {item.endereco}</Text>
      <Text style={styles.pedidoInfo}>Hora do Pedido: {item.horaPedido}</Text>
      <Text style={styles.pedidoInfo}>Valor Total: {item.valorTotal}</Text>
      <Text style={styles.pedidoInfo}>
        Forma de Pagamento: {item.formaPagamento}
      </Text>
      {!item.concluido && (
        <TouchableOpacity onPress={() => concluirPedido(item.id)}>
          <Text style={styles.botaoConcluir}>Concluir</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image source={logo} style={styles.logo} />
        <TextInput
          style={styles.input}
          placeholder="Nome da pessoa"
          value={nome}
          onChangeText={setNome}
        />
        <TextInput
          style={styles.input}
          placeholder="Telefone"
          value={telefone}
          onChangeText={setTelefone}
        />
        <TextInput
          style={styles.input}
          placeholder="Itens pedidos"
          value={itens}
          onChangeText={setItens}
        />
        <TextInput
          style={styles.input}
          placeholder="Endereço"
          value={endereco}
          onChangeText={setEndereco}
        />
        <TextInput
          style={styles.input}
          placeholder="Hora do Pedido"
          value={horaPedido}
          onChangeText={setHoraPedido}
        />
        <TextInput
          style={[styles.input, styles.valorTotal]}
          placeholder="Valor Total do Pedido"
          value={valorTotal}
          onChangeText={setValorTotal}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Forma de Pagamento"
          value={formaPagamento}
          onChangeText={setFormaPagamento}
        />
        <Button title="Adicionar Pedido" onPress={adicionarPedido} />
        <Button title="Limpar Lista" onPress={limparLista} color="#FF0000" />
        <Text style={styles.totalText}>
          Total dos Pedidos: R${calcularTotalPedidos()}
        </Text>
        <FlatList
          data={pedidos}
          keyExtractor={(item) => item.id}
          renderItem={renderPedido}
          style={styles.lista}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
  },
  logo: {
    width: 300,
    height: 300,
    alignSelf: "center",
    marginBottom: 20,
  },
  input: {
    borderColor: "#CCCCCC",
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  valorTotal: {
    marginBottom: 20,
  },
  lista: {
    marginTop: 20,
  },
  pedidoItem: {
    padding: 15,
    borderColor: "#DDDDDD",
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 5,
  },
  pedidoConcluido: {
    backgroundColor: "#D4EDDA",
  },
  botaoConcluir: {
    color: "#007BFF",
  },
  pedidoInfo: {
    fontSize: 16,
    color: "#333333",
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    textAlign: "center",
  },
});

export default telaInicial;
