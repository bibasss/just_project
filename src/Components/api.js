import axios from "axios";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";

const decodeToken = (token) => {
  return jwtDecode(token);
}

const authHeader = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    console.log(user.token);

    if(user && user.token){
        return { authorization: 'Bearer ' + user.token}
    }

    return{};
}

export const getAllPost = async () => {
    return await axios.get('http://localhost:4000/posts')
}


export const getPostByCategories = async (category) => {
    return await axios.get('http://localhost:4000/posts', {
        params: {
            post_type: category
        }
    })
}

export const doLogin = async(email, password) => {
    console.log(email + " " + password);
    try{
        const response = await axios.post('http://localhost:4005/login',
        {
            email: email,
            password: password
        }
    );

    const user = response.data;
    localStorage.setItem("user", JSON.stringify(response.data));
    return {success: true, data: user};


    }catch(err){
        toast(err.response.data.message)
        return {success: false};
    }
}

export const doRegister = async (name, email, password) => {
    try {
        console.log("c " + password+name);
        await axios.post('http://localhost:4005/register', {
            username: name,
            email: email,
            password: password
        });

        return { success: true };

    } catch (error) {
        console.error('Registration error: ' + error);
        return { success: false };
    }
}


export const getAllMyPosts = async () => {
    try{
        const response = await axios.get(
            'http://localhost:4005/privatePosts',
            {
                headers: authHeader()
            }
        );
        return {success: true, data: response.data}
    }catch(er){
        return {success: false};
    }
}

export const getAllCategories = async () => {
    try{
        const response =  await axios.get('http://localhost:4005/categories');
        return {success: true, data: response.data}
    }catch(er){
        return {success: false, data: er.response.data.message};
    }
}

export const getAllPosts = async () => {
    try{
        const response =  await axios.get('http://localhost:4005/posts');
        return {success: true, data: response.data}
    }catch(er){
        return {success: false, data: er.response.data.message};
    }
}

export const getAllUsers = async () => {
    try{
        const response =  await axios.get('http://localhost:4005/users');
        return {success: true, data: response.data}
    }catch(er){
        return {success: false, data: er.response.data.message};
    }
}




export const checkToken = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.token) {
        const decodedToken = decodeToken(user.token);
        if (decodedToken) {
            if (decodedToken.exp > Date.now() / 1000) {
                return { valid: true, message: "Token is valid" };
            } else {
                return { valid: false, message: "Token has expired" };
            }
        } else {
            return { valid: false, message: "Invalid token" };
        }
    } else {
        return { valid: false, message: "Что бы перейди в этот раздел нужно войти в свой аккаунт" };
    }
}

export const createPost = async (postData) => {
    try {
        const response = await axios.post('http://localhost:4005/posts/create', postData, {
            headers: authHeader()
        });
        return { success: true, data: response.data };
    } catch (error) {
        console.error('Error creating post:', error);
        return { success: false, data: error.response.data.message };
    }
}

export const updatePost = async (postId, postData) => {
    try {
        const response = await axios.put(`http://localhost:4005/posts/edit/${postId}`, postData, {
            headers: authHeader()
        });

        return { success: true, data: response.data };
    } catch (error) {
        console.error('Error updating post:', error);
        return { success: false, data: error.response.data.message };
    }
}

export const deletePost = async (postId) => {
    try {
        const response = await axios.delete(`http://localhost:4005/posts/${postId}`, {
            headers: authHeader()
        });
        return { success: true, data: response.data };
    } catch (error) {
        console.error('Error deleting post:', error);
        return { success: false, data: error.response.data.message };
    }
}


export const getPostById = async (postId) => {
    try {
        const response = await axios.get(`http://localhost:4005/posts/${postId}`);
        return { success: true, data: response.data };
    } catch (error) {
        console.error('Error fetching post by ID:', error);
        return { success: false, data: error.response.data.message };
    }
};


export const editPost = async (postId, postData) => {
    try {
      const response = await axios.put(`http://localhost:4005/posts/edit/${postId}`, postData, {
        headers: authHeader()
      });
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Error editing post:', error);
      return { success: false, data: error.response.data.message };
    }
  }