exports.run = async function (client, message, args) { // Exporta para handler.

message.delete(); // Serve para apagar a mensagem do usuário

message.reply(`Ping de ${~~client.ping}`) // Resposta do comando.

}