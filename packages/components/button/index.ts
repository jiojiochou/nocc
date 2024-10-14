import type { SFCWithInstall } from '@nosc/utils'
import { withInstall } from '@nosc/utils'
import Button from './src/button.vue'

export const NButton: SFCWithInstall<typeof Button> = withInstall(Button)

export default NButton
