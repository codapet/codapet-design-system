import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input
} from '@codapet/design-system'
import { useForm } from 'react-hook-form'

export const PetDetailsField = () => {
  const form = useForm({ defaultValues: { petName: 'Bella' } })

  return (
    <Form {...form}>
      <form className="flex w-80 flex-col gap-6">
        <FormField
          control={form.control}
          name="petName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pet&rsquo;s name</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Bella" {...field} />
              </FormControl>
              <FormDescription>
                We&rsquo;ll use this on all visit records.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}

export const ContactField = () => {
  const form = useForm({ defaultValues: { email: '' } })

  return (
    <Form {...form}>
      <form className="flex w-80 flex-col gap-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email address</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="you@codapet.com"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Visit confirmations are sent here.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}
