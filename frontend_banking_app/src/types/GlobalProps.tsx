export interface CustomButtonProps {
  children?: any,
  onClick?: () => any,
  disabled?: boolean,
  className?: string
}

export interface DestructionButtonProps extends CustomButtonProps{
  affirmationRequired?: boolean
  affirmationMessage?: string
}