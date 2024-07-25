import axios from './axios'


export const getCourses = async(link) => {
        try{
            console.log(link)
          const {data} = await axios.get(link)
          console.log(data)
          return data;
        }catch(error){
          console.log(error)
        }
}
export const postCourses = async(link) => {
        try{
            console.log(link)
          const {data} = await axios.post(link)
          console.log(data)
          return data;
        }catch(error){
          console.log(error)
        }
}