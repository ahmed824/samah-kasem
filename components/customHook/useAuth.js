import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { baseUrl } from '../baseUrl';

export const useAuth = () => {
    const queryClient = useQueryClient();

    const setUserSession = (userData) => {
        sessionStorage.setItem('user', JSON.stringify(userData));
    };

    const getUserSession = () => {
        const user = sessionStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    };

    // const register = useMutation({
    //     mutationFn: async (userData) => {
    //         const response = await axios.post(`${baseUrl}/rest/tables.news/signUp`, {
    //             name: userData.name,
    //             mail: userData.email,
    //             userName: userData.username,
    //             password: userData.password,
    //             phone: userData.mobile,
    //             rank:"Admin"
    //         });
            
    //         if (response.data.success) {
    //             setUserSession({ id: response.data.id , rank:"Admin" });
    //             return response.data;
    //         } else {
    //             throw new Error(response.data.message || 'Failed to register');
    //         }
    //     }
    // });

    const logout = () => {
        sessionStorage.removeItem('user');
        queryClient.clear();
    };

    return {
        register,
        logout,
        getUserSession
    };
};