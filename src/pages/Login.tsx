
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';

const loginSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  age: z.number().min(3, { message: "Age must be at least 3." }).max(10, { message: "Age must be less than 10." }),
});

const Login: React.FC = () => {
  const { updateUser, theme } = useAppContext();
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(true);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      name: "",
      age: 4,
    },
  });

  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    const userType = values.age <= 5 ? 'pre-student' : 'student';
    
    updateUser({
      name: values.name,
      age: values.age,
      type: userType,
    });
    
    toast.success(`Welcome, ${values.name}! You're now logged in.`);
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className={`p-4 ${theme === 'light' 
        ? 'bg-gradient-to-r from-purple-400 to-blue-500' 
        : 'bg-gradient-to-r from-gray-800 to-blue-900'} 
        text-white shadow-lg rounded-b-lg`}>
        <div className="container mx-auto flex justify-center items-center">
          <span className="text-3xl font-bold animate-bounce">
            <span className="text-yellow-300">Learning</span> 
            <span className="text-green-300">Fun</span> 
            <span className="text-pink-300">Galaxy</span>
          </span>
        </div>
      </div>
      
      <main className="flex-1 container mx-auto px-4 py-8 flex justify-center items-center">
        <div className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-xl shadow-xl animate-fade-in">
          <div className="mb-6 text-center">
            <div className="flex justify-center mb-4">
              {isSignUp ? (
                <img src="https://i.pinimg.com/originals/e4/34/2a/e4342a4e0e968344b75cf50cf1936c09.jpg" 
                     className="w-32 h-32 rounded-full border-4 border-blue-400 animate-pulse" 
                     alt="Anime character" />
              ) : (
                <img src="https://i.pinimg.com/originals/42/d7/90/42d790c24a5677cacde958859c979c4f.jpg" 
                     className="w-32 h-32 rounded-full border-4 border-green-400 animate-pulse" 
                     alt="Anime character" />
              )}
            </div>
            <h2 className="text-2xl font-bold mb-1">
              {isSignUp ? "Sign Up" : "Login"}
            </h2>
            <p className="text-gray-500 dark:text-gray-400">
              {isSignUp ? "Create your account to start learning!" : "Welcome back to your learning journey!"}
            </p>
          </div>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Child's Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Age</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        min={3} 
                        max={10}
                        placeholder="Enter age" 
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value || '0'))} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="pt-4">
                <Button type="submit" className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 transition-all">
                  {isSignUp ? "Create Account" : "Login"}
                </Button>
              </div>
            </form>
          </Form>
          
          <div className="mt-6 text-center">
            <Button 
              variant="link" 
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-blue-500 hover:underline"
            >
              {isSignUp ? "Already have an account? Login" : "Don't have an account? Sign Up"}
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;
