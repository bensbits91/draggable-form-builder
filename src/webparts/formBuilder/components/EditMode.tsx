import * as React from 'react';
import EditModeStep from './EditModeStep';
import { Dropdown/* , IDropdownOption, IDropdownStyles */ } from 'office-ui-fabric-react/lib/Dropdown';
// import SortableTree from 'react-sortable-tree';
// import 'react-sortable-tree/style.css';
import Dnd from './Dnd';



export interface EditModeProps {
    lists;
    handler;
    selectedList?: any;
}

export interface EditModeState {

}

class EditMode extends React.Component<EditModeProps, EditModeState> {
    constructor(props: EditModeProps) {
        super(props);
        this.state = {};
    }

    public render() {
        const { lists, selectedList } = this.props;

        const step1 = <EditModeStep
            stepNumber={1}
            stepTitle='Choose a SharePoint list'
        />;

        const listsOptions = [
            {
                key: 'noselection',
                text: 'Please make a selection',
                // disabled: true
            },
            ...lists.map(l => {
                const lTitle = l.Title;
                return {
                    key: lTitle.replace(/ /g, ''),
                    text: lTitle
                };
            })];

        const listDropdown = <Dropdown
            id='listDropdown'
            // data-go-to-section={field.go_to_section ? field.go_to_section : ''}
            placeholder='Please make a selection'
            // label={label}
            options={listsOptions}
            // defaultSelectedKey={value}
            // styles={dropdownStyles_dark}
            onChange={(e, o) => this.props.handler('listDropdown', o.text)}
        />;

        const dnd = selectedList ?
            <Dnd
                fields={selectedList.fields}
            />
            : <></>;



        const step2 = selectedList ?
            <EditModeStep
                stepNumber={2}
                stepTitle='Configure sections and fields'
            /> : <></>;

        return (
            <>
                {step1}
                {listDropdown}
                {step2}
                {dnd}
            </>
        );
    }
}

export default EditMode;