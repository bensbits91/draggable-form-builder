import * as React from 'react';




export interface EditModeStepProps {
    stepNumber: number;
    stepTitle: string;
}

export interface EditModeStepState {

}

class EditModeStep extends React.Component<EditModeStepProps, EditModeStepState> {
    constructor(props: EditModeStepProps) {
        super(props);
        this.state = {};
    }

    public render() {
        const { stepNumber, stepTitle } = this.props;
        return (
            <div>
                Step {stepNumber}: {stepTitle}
            </div>
        );
    }
}

export default EditModeStep;