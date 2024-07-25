import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PaymentValidation } from "@/lib/validations/payment";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { axiosInstance } from '@/api/axios';
import PaystackPop from '@paystack/inline-js';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export default function PaymentForm() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(PaymentValidation),
    defaultValues: {
      email: '',
      amount: '',
      domain: ''
    },
  });
const paystackKey: string = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;
  const onSubmit = async (values) => {
    setLoading(true);
    try {
      // const response = await axiosInstance.post('/initialize-payment', values);
      // const access_code = response.data.data?.access_code;
      const paystackInstance = new PaystackPop();
      const onSuccess = (transaction) => {
        navigate(`/callback-url?reference=${transaction.reference}`);
      };

      paystackInstance.newTransaction({
        key: paystackKey,
        email: values.email,
        amount: values.amount * 100,
        metadata: {
        custom_fields: [
          {
            display_name: "Domain",
            variable_name: "domain",
            value: values.domain,
          },
        ],
        },
        onSuccess,
        onCancel: () => {
          toast.info("Transaction was cancelled");
        },
        onError: (error) => {
          toast.error("Error: ", error.message);
        }
      });
    } catch (err) {
      console.error(err);
      toast.error("Payment initialization failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Form {...form}>
        <form className="flex flex-col justify-start gap-6" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1 w-full">
                <FormLabel className="text-base-semibold text-white">
                  Email Address
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    className="no-focus focus:outline-none focus:ring-0 border-none outline-none text-light-1"
                  />
                </FormControl>
                <FormMessage className="text-subtle-semibold text-red-500" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1 w-full">
                <FormLabel className="text-base-semibold text-white">
                  Amount
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    className="no-focus focus:outline-none focus:ring-0 border-none outline-none text-light-1"
                  />
                </FormControl>
                <FormMessage className="text-subtle-semibold text-red-500" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="domain"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1 w-full">
                <FormLabel className="text-base-semibold text-white">
                  Domain
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    className="no-focus focus:outline-none focus:ring-0 border-none outline-none text-light-1"
                  />
                </FormControl>
                <FormMessage className="text-subtle-semibold text-red-500" />
              </FormItem>
            )}
          />
          <button
            type="submit"
            className="py-2.5 shadow-lg text-[#fff38e] rounded hover:text-white transition hover:bg-[#095a55] border border-[#fff38e]"
            disabled={loading}
          >
            {loading ? "Processing..." : "Pay Now"}
          </button>
        </form>
      </Form>
    </div>
  );
}
