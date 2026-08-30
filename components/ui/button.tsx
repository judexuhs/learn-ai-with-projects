import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex max-w-full shrink-0 select-none items-center justify-center gap-1.5 border border-transparent font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-black/20 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:border-black/10 disabled:bg-black/5 disabled:text-black/35 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'bg-[#5146d8] text-white shadow-[0_8px_18px_rgba(81,70,216,.2)] hover:bg-[#4036bf]',
        outline: 'border-[#dcdcf0] bg-white text-[#27304a] hover:border-[#b8b5eb] hover:bg-[#f7f6ff]',
        secondary: 'border-[#dcdcf0] bg-white text-[#27304a] hover:border-[#b8b5eb] hover:bg-[#f7f6ff]',
        ghost: 'bg-transparent text-[#27304a] hover:bg-[#eeecff]',
        destructive: 'bg-[#e5484d] text-white hover:bg-[#d13438]',
        link: 'text-[hsl(212_100%_41%)] underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 rounded-xl px-4 text-sm',
        xs: 'h-6 rounded px-2 text-xs',
        sm: 'h-8 rounded-md px-2.5 text-sm',
        lg: 'h-12 rounded-xl px-5 text-base',
        icon: 'size-10 rounded-md',
        'icon-xs': 'size-6 rounded',
        'icon-sm': 'size-8 rounded-md',
        'icon-lg': 'size-12 rounded-lg',
      },
    },
    defaultVariants: { variant: 'default', size: 'default' },
  },
);

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonVariants> & {
  render?: React.ReactElement;
  nativeButton?: boolean;
};

function Button({ className, variant, size, render, nativeButton: _nativeButton, ...props }: ButtonProps) {
  const classes = cn(buttonVariants({ variant, size }), className);
  if (render && React.isValidElement(render)) {
    return React.cloneElement(render, { ...props, className: cn((render.props as { className?: string }).className, classes) } as React.HTMLAttributes<HTMLElement>);
  }
  return <button className={classes} {...props} />;
}

export { Button, buttonVariants };
