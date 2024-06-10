import { Button } from '@/shared/ui/button'
import { Typography } from '@/shared/ui/typography'

type CancelButtonPropType = {
  onClick: () => void
}

export const CancelButton = ({ onClick }: CancelButtonPropType) => {
  return (
    <Button onClick={onClick} variant="secondary">
      <Typography variant="medium_14">{'Cancel'}</Typography>
    </Button>
  )
}
