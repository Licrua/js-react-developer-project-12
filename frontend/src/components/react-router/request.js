import axios from "axios";
import { addChannel } from "./redux/channelsSlice";


export async function getChannel(token) {
    const request = await axios.get('/api/v1/channels', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await request.data
     localStorage.setItem('channels', JSON.stringify(data))
    console.log('STORAGE', localStorage.getItem('channels'));
    return request.data
  }


  export async function loginUser() {
    const request = axios.post('/api/v1/login', { username: 'admin', password: 'admin' })
    console.log(request);
    return request.data
  }




  export async function newUser() {
    try {
      const request = await axios.post('/api/v1/signup', { username: 'vano_stephano', password: 'vano_stephano' });
      console.log('newUserADD', request);
      return request.data; // Возвращаем данные из ответа, если запрос выполнен успешно
    } catch (error) {
      if (error.response && error.response.status === 409) {
        console.log('User with this username already exists');
        // Можно выполнить дополнительные действия в случае конфликта, например, обновить UI или предложить пользователю выбрать другое имя
      } else {
        console.log('An error occurred while creating a new user:', error.message);
        // Обработка других видов ошибок, например, сетевых проблем или ошибок сервера
      }
      throw error; // Повторное возбуждение ошибки для обработки её в других частях кода
    }
  }
  


  export async function addSomeChannel(token, obj) {
    const request = await axios.post('/api/v1/channels', obj, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('request', request.data);
    return request
  }

  export async function getMessage(token) {
    const request = await axios.get('/api/v1/messages', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return  request
  }

  export async function checkRender() {
    const request = await axios.post('https://js-react-developer-project-12-8.onrender.com/api/v1/signup')
    console.log('checkRender', request);
 return request
  }


  export async function addMessageValue(newMessage, token) {
    const value = await axios.post('/api/v1/messages', newMessage, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    console.log('addMessageValue', value.data);
    return value.data
  }
export async function removeChannel(id, token) {
  const request = await axios.delete(`/api/v1/channels/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  console.log('removeChannel', request);
}