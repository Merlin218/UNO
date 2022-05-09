import { defineStore } from "pinia";
import type { RoomInfo, PlayerInfo } from "types/room";
import type { ServerKeys } from "types/server";
import socket from "~/socket";

const useSocketStore = defineStore('socket', {
  state: () => {
    return {
      socket
    }
  },
  actions: {
    Promisify<T>(eventName: ServerKeys) {
      return new Promise<T>((resolve, reject) => {
        this.socket.on(eventName, (res:any) => {
          let { message, data } = res;
          if (message) {
            // 显示消息弹窗
          }
          resolve(data)
        })
      })
    },
    createUser(name: string) {
      this.socket.emit('CREATE_USER', {
        type: 'CREATE_USER',
        data: {
          id: Date.now().toString(),
          name,
        }
      })
      return this.Promisify<UserInfo>('RES_CREATE_USER')
    },
    createRoom(name: string, owner: UserInfo) {
      this.socket.emit('CREATE_ROOM', {
        type: 'CREATE_ROOM',
        data: {
          roomId: Date.now().toString(),
          roomName: name,
          owner
        }
      })
      return this.Promisify<RoomInfo>('RES_CREATE_ROOM')
    },
    joinRoom(code: string, playerInfo: PlayerInfo) {
      this.socket.emit('JOIN_ROOM', {
        type: 'JOIN_ROOM',
        data: {
          roomCode: code,
          playerInfo
        }
      })
      return this.Promisify<RoomInfo>('RES_JOIN_ROOM')
    },
  }
})

export default useSocketStore
