import { connect, ConnectedProps } from "react-redux"
import { Navigation } from "../../components/navigation/Navigation"
import { setRootMethod } from "../../state/slices/methodInputSlice"
import { AppDispatch } from "../../state/store"

interface NavigationDispatchProps {
    onSubmit: (value: string) => void
}

function mapDispatchToProps(dispatch: AppDispatch): NavigationDispatchProps {
    return {
        onSubmit: (value: string) => {
            dispatch(setRootMethod(value))
        },
    }
}

const connector = connect(null, mapDispatchToProps)

export type NavigationContainerProps = ConnectedProps<typeof connector>
export const NavigationContainer = connector(Navigation)
