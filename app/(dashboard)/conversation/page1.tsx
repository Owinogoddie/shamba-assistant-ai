// import React, { useState, useEffect } from 'react';
// import { MessageSquare } from 'lucide-react';

// import { zodResolver } from '@hookform/resolvers/zod';
// import { useForm, SubmitHandler } from 'react-hook-form';
// import axios from 'axios';

// import { z } from 'zod';

// import { Button } from '@/components/ui/button';
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from '@/components/ui/form';
// import { Input } from '@/components/ui/input';
// import { cn } from '@/lib/utils';
// import { Empty } from '../_components/empty';
// import { Loader } from '../_components/loader';
// import { useRouter } from 'next/navigation';
// import { Markdown } from '../_components/markdown';
// import { SelectModal } from './_components/select-modal';
// import { useDialogStore } from '@/hooks/useDialog';
// import { Heading } from '../_components/heading';

// // Define the interface for props passed to Heading component
// interface HeadingProps {
//   title: string;
//   description: string;
//   icon: React.ComponentType<{ className?: string }>;
//   iconColor: string;
//   bgColor: string;
// }

// // Define the type for your form values
// const formSchema = z.object({
//   prompt: z.string().min(2, {
//     message: 'Prompt must be at least 2 characters.',
//   }),
// });

// type FormValues = z.infer<typeof formSchema>;

// const ConversationPage: React.FC = () => {
//   const router = useRouter();
//   const [loading, setLoading] = useState(false);
//   const [history, setHistory] = useState<any[]>([]); // Adjust 'any' as per your history item structure
//   const { value, setValue } = useDialogStore();

//   useEffect(() => {
//     console.log('value from zustand', value);
//   }, [value, setValue]);

//   const form = useForm<FormValues>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       prompt: '',
//     },
//   });

//   const isloading = form.formState.isSubmitting;

//   const onSubmit: SubmitHandler<FormValues> = async (values) => {
//     try {
//       setLoading(true);
//       const userMessage = {
//         role: 'user',
//         content: values.prompt,
//       };

//       const newMessages = [...history, userMessage];
//       let response;

//       if (value === 'general') {
//         response = await axios.post('/api/conversation', {
//           messages: newMessages,
//           input: values.prompt,
//         });
//       } else {
//         response = await axios.post('/api/cropSpecificConv', {
//           messages: newMessages,
//           question: values.prompt,
//           crop: value,
//         });
//       }

//       console.log(response.data);
//       setHistory((prev) => [...response.data, ...prev]);
//     } catch (error:any) {
//       console.log('error generating', error.message);
//       setLoading(false);
//     } finally {
//       setLoading(false);
//       router.refresh();
//     }
//   };

//   const handleClick = () => {
//     setHistory([]);
//   };

//   return (
//     <div>
//       <SelectModal />

//       <Heading
//         bgColor="bg-emerald-500/10"
//         iconColor="text-emerald-500"
//         description="Chat wit the an expert to get what your farm needs"
//         icon={MessageSquare}
//         title="Chat with a farm expert"
//       />
//       <div>
//         <div className="pb-6">
//           {value && value !== 'general' && (
//             <h3 className="text-semibold text-center text-xl md:text-2xl">
//               Welcome Iam your expert in {value} farming 😎
//             </h3>
//           )}
//           {value && value === 'general' && (
//             <h3 className="text-semibold text-center text-xl md:text-2xl">
//               Welcome Iam your expert in all farming matters 😎
//             </h3>
//           )}
//         </div>
//         <div>
//           {history && (
//             <Button
//               type="button"
//               onClick={handleClick}
//               size="sm"
//               variant="secondary"
//               className="m-3"
//             >
//               clear history
//             </Button>
//           )}
//           <Button
//             type="button"
//             onClick={() => {
//               setValue('');
//             }}
//             size="sm"
//             variant="premium"
//             className="m-3"
//           >
//             Choose another crop
//           </Button>
//         </div>
//         <Form {...form}>
//           <form
//             onSubmit={form.handleSubmit(onSubmit)}
//             className="roumded-lg border w-full p-4 px-3 md:px-6 focus-within:sm grid grid-cols-12 gap-2"
//           >
//             <FormField
//               control={form.control}
//               name="prompt"
//               render={({ field }) => (
//                 <FormItem className="col-span-12 lg:col-span-10">
//                   <FormLabel>Query</FormLabel>
//                   <FormControl className="m-0 p-0">
//                     <Input
//                       className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent border-b-2"
//                       placeholder="Start chatting"
//                       {...field}
//                       disabled={loading}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <Button
//               type="submit"
//               className="col-span-12 lg:col-span-2 w-full"
//               disabled={loading}
//             >
//               Submit
//             </Button>
//           </form>
//         </Form>
//       </div>
//       <div className="space-y-4 mt-4">
//         {loading && <div>{<Loader />}</div>}
//         {history.length === 0 && !isloading && !loading && (
//           <div>
//             <Empty />
//           </div>
//         )}
//         <div className="flex flex-col gap-y-4">
//           <div>
//             {history &&
//               history.map((item, i) => (
//                 <div
//                   key={i}
//                   className={cn(
//                     'w-full p-8 flex items-start gap-x-8 rounded-lg',
//                     item.role === 'user'
//                       ? 'bg-white border border-black/10'
//                       : 'bg-muted'
//                   )}
//                 >
//                   <Markdown content={item.content} />
//                 </div>
//               ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ConversationPage;
