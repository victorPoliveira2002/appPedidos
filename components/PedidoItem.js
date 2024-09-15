import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const PedidoItem = ({ pedido, onConcluir }) => {
  return (
    <View style={styles.pedidoItem}>
      <Text style={styles.pedidoDescricao}>Nome: {pedido.nome}</Text>
      <Text style={styles.pedidoDescricao}>Telefone: {pedido.telefone}</Text>
      <Text style={styles.pedidoDescricao}>Itens: {pedido.itens}</Text>
      <Text style={styles.pedidoDescricao}>Endereço: {pedido.endereco}</Text>
      <Text style={styles.pedidoDescricao}>
        Hora do Pedido: {pedido.horaPedido}
      </Text>
      <Text style={styles.pedidoDescricao}>
        Valor Total: {pedido.valorTotal}
      </Text>
      {!pedido.concluido && (
        <TouchableOpacity onPress={() => onConcluir(pedido.id)}>
          <Text style={styles.botaoConcluir}>Concluir</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  pedidoItem: {
    padding: 10,
    borderColor: "#aaa",
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 5,
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  pedidoDescricao: {
    fontSize: 16,
    color: "#333",
  },
  pedidoConcluido: {
    textDecorationLine: "line-through",
    color: "green",
  },
  botaoConcluir: {
    color: "blue",
    marginTop: 10,
  },
});

export default PedidoItem;
