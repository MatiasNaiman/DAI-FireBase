import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', // Opcional, ajusta el color de fondo
  },
  todo: {
    width: '70%',
    margin: '3rem auto 0 auto',
  },
  header: {
    fontSize: 40, // Tamaño de fuente ajustado para dispositivos móviles
    marginVertical: 20, // Margen vertical en lugar de marginBottom
    textAlign: 'center',
  },
  input: {
    padding: 10,
    borderBottomWidth: 1, // Borde inferior en lugar de caja
    width: '100%',
  },
  btnContainer: {
    flexDirection: 'row', // Cambio de display flex a flexDirection para filas
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20, // Cambio de 1rem a 20 para adaptar a dispositivos móviles
  },
  btn: {
    padding: 10,
    paddingHorizontal: 20, // Ancho del botón ajustado
    backgroundColor: '#334',
    color: 'white',
    borderRadius: 5,
    cursor: 'pointer', // No necesario en React Native
  },
  todoContent: {
    marginTop: 40, // Ajustado para dispositivos móviles
  },
})