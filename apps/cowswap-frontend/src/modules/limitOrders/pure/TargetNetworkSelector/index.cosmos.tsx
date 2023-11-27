import { TargetNetworkSelector } from './index'
import { defaultTargetNetwork } from './deadlines'

const Fixtures = {
  default: (
    <TargetNetworkSelector
      deadline={defaultTargetNetwork}
      // customDeadline={null}
      selectDeadline={() => void 0}
      // selectCustomDeadline={() => void 0}
    />
  ),
}

export default Fixtures
