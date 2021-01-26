import * as React from 'react';
import EditMode from './EditMode';
import { sp } from "@pnp/sp/presets/all";

const mcc = 'background-color:black;color:orange;';

export interface AppProps {
    context: any;
}

export interface AppState {
    lists?: any;
    selectedList?: any;
}

class App extends React.Component<AppProps, AppState> {
    constructor(props: AppProps) {
        super(props);
        this.state = {};
    }

    public componentDidMount() {
        this.getLists().then(lists => {
            this.setState({ lists: lists });
        });
    }


    public getLists = () => new Promise(resolve => {
        sp.web.lists
            .filter('BaseTemplate eq 100 or BaseTemplate eq 102 or BaseTemplate eq 103 or BaseTemplate eq 104 or BaseTemplate eq 105 or BaseTemplate eq 106 or BaseTemplate eq 107')
            .get().then(lists => {
                resolve(lists);
            });


    })





    public getListInfo = (listName) => new Promise(resolve => {
        sp.web.lists
            .getByTitle(listName)
            // .select('Title', 'BaseTemplate')
            .get().then(listInfo => {
                resolve(listInfo);
            });
    })

    public getFields = (listName) => new Promise(resolve => {
        sp.web.lists
            .getByTitle(listName)
            .fields
            .filter(`
                Hidden eq false 
                and InternalName ne 'ContentType'
                and InternalName ne '_UIVersionString'
                and InternalName ne 'Edit'
                and InternalName ne 'LinkTitleNoMenu'
                and InternalName ne 'LinkTitle'
                and InternalName ne 'DocIcon'
                and InternalName ne 'ItemChildCount'
                and InternalName ne 'FolderChildCount'
                and InternalName ne '_ComplianceFlags'
                and InternalName ne '_ComplianceTag'
                and InternalName ne '_ComplianceTagWrittenTime'
                and InternalName ne '_ComplianceTagUserId'
                and InternalName ne '_IsRecord'
                and InternalName ne 'AppAuthor'
                and InternalName ne 'AppEditor'
                and InternalName ne 'ComplianceAssetId'
            `)
            // .select('Title', 'BaseTemplate')
            .get().then(fields => {
                resolve(fields);
            });
    })






    public handler_editMode(field, value) {
        console.log('%c : App -> handler_editMode -> field', mcc, field);
        console.log('%c : App -> handler_editMode -> value', mcc, value);
        if (field == 'listDropdown' && value != 'Please make a selection') {
            this.getListInfo(value).then((listInfo: any) => {
                console.log('%c : App -> handler_editMode -> listInfo', mcc, listInfo);
                this.getFields(value).then((fields: any) => {
                    console.log('%c : App -> handler_editMode -> fields', mcc, fields);
                    // fields.map(f => console.log(f.InternalName + ' - ' + f.TypeAsString + ' - readonly: ' + f.ReadOnlyField));
                    this.setState({
                        selectedList: {
                            title: listInfo.Title,
                            fields: fields
                        }
                    });
                });
            });
        }
    }










    public render() {
        const { lists, selectedList } = this.state;

        const elEditMode = lists ?
            <EditMode
                lists={lists}
                selectedList={selectedList}
                handler={this.handler_editMode.bind(this)}
            /> : <></>;
        return (
            elEditMode
        );
    }
}

export default App;