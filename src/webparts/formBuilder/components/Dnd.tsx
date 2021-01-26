import * as React from 'react';
import SortableTree from 'react-sortable-tree';
import 'react-sortable-tree/style.css';


const mcc = 'background-color:lime;color:black;';

const initUnused = [
    {
        title: 'Field 1',
        subtitle: 'field type: TypeAsString | Field ID: InternalName | required: Required',
        id: 'Field1',
        dndType: 'cell',
    },
    {
        title: 'Field 2',
        subtitle: 'field type: TypeAsString | Field ID: InternalName | required: Required',
        id: 'Field2',
        dndType: 'cell',
    },
    {
        title: 'Field 3',
        subtitle: 'field type: TypeAsString | Field ID: InternalName | required: Required',
        id: 'Field3',
        dndType: 'cell',
    },
    {
        title: 'Field 4',
        subtitle: 'field type: TypeAsString | Field ID: InternalName | required: Required',
        id: 'Field4',
        dndType: 'cell',
    },
    {
        title: 'Field 5',
        subtitle: 'field type: TypeAsString | Field ID: InternalName | required: Required',
        id: 'Field5',
        dndType: 'cell',
    },
];

const emptyColumn = {
    title: 'Column',
    id: '',
    dndType: 'column',
    expanded: true,
};

const emptyRow = {
    title: 'Row',
    id: '',
    dndType: 'row',
    expanded: true,
    children: [emptyColumn],
};


const initTreeData = [
    {
        title: 'Row 1',
        id: 'Row1',
        dndType: 'row',
        expanded: true,
        children: [
            {
                title: 'Column 1',
                id: 'Column1',
                dndType: 'column',
                expanded: true,
                // children: [
                //     {
                //         title: 'Cell 1',
                //         id: 'Cell1',
                //         dndType: 'cell',
                //         expanded: true,
                //     },
                //     {
                //         title: 'Cell 2',
                //         id: 'Cell2',
                //         dndType: 'cell',
                //         expanded: true,
                //     },
                // ],
            },
        ],
    },
    // {
    //     title: 'Row 2',
    //     id: 'Row2',
    //     dndType: 'row',
    //     expanded: true,
    //     children: [
    //         {
    //             title: 'Column 2',
    //             id: 'Column2',
    //             dndType: 'column',
    //             expanded: true,
    //         },
    //         {
    //             title: 'Column 3',
    //             id: 'Column3',
    //             dndType: 'column',
    //             expanded: true,
    //         },
    //     ],
    // },
];


const uuidv4 = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}




export interface DndProps {
    fields;
}

export interface DndState {
    unusedFields?;
    treeData;
}

class Dnd extends React.Component<DndProps, DndState> {
    constructor(props: DndProps) {
        super(props);
        this.state = {
            // unusedFields: initUnused,
            treeData: initTreeData,
        };
    }

    public componentDidMount() {
        console.log('%c : Dnd -> componentDidMount -> this.props', mcc, this.props);
        const { fields } = this.props;
        const unused = fields.map(f => {
            return ({
                title: f.Title,
                subtitle: `field type: ${f.TypeAsString} | Field ID: ${f.InternalName} | required: ${f.Required}`,
                id: f.InternalName,
                dndType: 'cell',
            });
        });
        Promise.all(unused).then(fieldsMapped => {
            this.setState({ unusedFields: unused });
        });
    }

    public componentDidUpdate(prevProps: DndProps, prevState: DndState) {
        console.log('%c : Dnd -> componentDidUpdate -> this.state', mcc, this.state);
    }

    public onChangeTree = (data) => {
        // console.log('%c : Dnd -> publiconChangeTree -> data', mcc, data);
        this.setState({ treeData: data });
    }

    public onChangeUnused = (data) => {
        // console.log('%c : Dnd -> onChangeUnused -> data', mcc, data);
        this.setState({ unusedFields: data });
    }




    public onClickAdd = (nodeId, nodeType, dir) => {
        const newData = [...this.state.treeData];

        if (nodeType == 'row') {
            const thisRow = newData.find(d => d.id == nodeId);
            const rowIndex = newData.indexOf(thisRow);

            const newRow = JSON.parse(JSON.stringify(emptyRow));
            newRow.id = 'row-' + uuidv4();
            newRow.children[0].id = 'column-' + uuidv4();
            if (dir == 'above') {
                newData.splice(rowIndex, 0, newRow);
                this.setState({ treeData: newData });
            }
            else if (dir == 'below') {
                newData.splice(rowIndex + 1, 0, newRow);
                this.setState({ treeData: newData });
            }
        }

        else if (nodeType == 'column') {
            let thisRow;
            let thisCol;
            loopRows:
            for (let r in newData) {
                const rowr = newData[r];
                for (let c in rowr.children) {
                    const colc = rowr.children[c];
                    if (colc.id == nodeId) {
                        thisRow = rowr;
                        thisCol = colc;
                        break loopRows;
                    }
                }
            }

            const colIndex = thisRow.children.indexOf(thisCol);
            console.log('%c : Dnd -> publiconClickAdd -> colIndex', mcc, colIndex);

            const newCol = JSON.parse(JSON.stringify(emptyColumn));
            newCol.id = 'col-' + uuidv4();

            if (dir == 'before') {
                thisRow.children.splice(colIndex, 0, newCol);
                this.setState({ treeData: newData });
            }

            else if (dir == 'after') {
                thisRow.children.splice(colIndex + 1, 0, newCol);
                this.setState({ treeData: newData });
            }
        }
        else console.log('that\'s in the works...');
    }

    public onClickRemove = (nodeId, nodeType) => {
        const newData = [...this.state.treeData];
        const newUnused = [...this.state.unusedFields];

        if (nodeType == 'row') {
            const thisRow = newData.find(d => d.id == nodeId);
            const rowIndex = newData.indexOf(thisRow);
            const moveFieldsToUnused = newData[rowIndex].children.map(c => {
                console.log('%c : Dnd -> publiconClickRemove -> c', mcc, c);
                c.children.map(cc => {
                    console.log('%c : Dnd -> publiconClickRemove -> cc', mcc, cc);
                    newUnused.push(cc);
                });
            });
            Promise.all(moveFieldsToUnused).then(fieldsMoved => {
                newData.splice(rowIndex, 1);
                this.setState({
                    treeData: newData,
                    unusedFields: newUnused,
                });
            });
        }

        else if (nodeType == 'column') {
            let thisRow;
            let thisCol;
            loopRows:
            for (let r in newData) {
                const rowr = newData[r];
                for (let c in rowr.children) {
                    const colc = rowr.children[c];
                    if (colc.id == nodeId) {
                        thisRow = rowr;
                        thisCol = colc;
                        break loopRows;
                    }
                }
            }
            const colIndex = thisRow.children.indexOf(thisCol);
            const moveFieldsToUnused = thisRow.children[colIndex].children.map(cc => {
                console.log('%c : Dnd -> publiconClickRemove -> cc', mcc, cc);
                newUnused.push(cc);
            });
            Promise.all(moveFieldsToUnused).then(fieldsMoved => {
                console.log('%c : Dnd -> publiconClickRemove -> newUnused', mcc, newUnused);
                thisRow.children.splice(colIndex, 1);
                this.setState({
                    treeData: newData,
                    unusedFields: newUnused,
                });
            });

        }
        else console.log('that\'s in the works...');
    }



    public render() {

        const { treeData } = this.state;

        const canDropTree = ({ node, nextParent, prevPath, nextPath }) => {
            if (!!nextParent && node.dndType == 'row')
                return false;
            if (node.dndType == 'column' && !nextParent || node.dndType == 'column' && nextParent.dndType != 'row')
                return false;
            if (node.dndType == 'cell' && !nextParent || node.dndType == 'cell' && nextParent.dndType != 'column')
                return false;
            return true;
        };

        const canDropUnused = ({ node, nextParent, prevPath, nextPath }) => {
            if (node.dndType != 'cell' || !!nextParent)
                return false;
            return true;
        };

        // const onDragStateChanged = ({ isDragging, draggedNode }) => {
        //     console.log('%c : Dnd -> onDragStateChanged -> isDragging', mcc, isDragging);
        //     console.log('%c : Dnd -> onDragStateChanged -> draggedNode', mcc, draggedNode);

        // }

        const subtitleTree = (node) => {
            const { dndType, id } = node;
            console.log('%c : subtitleTree -> dndType', mcc, dndType);
            if (dndType == 'row') {
                const rowLength = this.state.treeData.length;
                return (
                    <div>
                        <a onClick={() => this.onClickAdd(id, dndType, 'above')}>Add row above</a>
                        <a onClick={() => this.onClickAdd(id, dndType, 'below')}>Add row below</a>
                        {rowLength > 1 && <a onClick={() => this.onClickRemove(id, dndType)}>Remove this row</a>}
                    </div>
                );
            }
            else if (dndType == 'column') {


                let thisRow;
                // let thisCol;
                loopRows:
                for (let r in treeData) {
                    const rowr = treeData[r];
                    for (let c in rowr.children) {
                        const colc = rowr.children[c];
                        if (colc.id == id) {
                            thisRow = rowr;
                            // thisCol = colc;
                            break loopRows;
                        }
                    }
                }
                console.log('%c : Dnd -> publiconClickAdd -> thisRow', mcc, thisRow);
                const thisRowColLength = thisRow.children.length;
                console.log('%c : Dnd -> subtitleTree -> thisRowColLength', mcc, thisRowColLength);

                // if (thisRowColLength < 3)
                return (
                    <div>
                        {thisRowColLength < 3 && <a onClick={() => this.onClickAdd(id, dndType, 'before')}>Add column before</a>}
                        {thisRowColLength < 3 && <a onClick={() => this.onClickAdd(id, dndType, 'after')}>Add column after</a>}
                        {thisRowColLength > 1 && <a onClick={() => this.onClickRemove(id, dndType)}>Remove this column</a>}
                    </div>
                );
            }
        };


        return (
            <div style={{ height: '100vh' }}>
                <div style={{ display: 'inline-block', height: '100vh', width: '40%', border: '1px solid #ccc' }}>
                    <SortableTree
                        treeData={this.state.unusedFields}
                        getNodeKey={({ node }) => node.id}
                        dndType='externalNodeType'
                        canDrop={canDropUnused}
                        maxDepth={1}
                        // onDragStateChanged={onDragStateChanged}
                        onChange={unusedFields => this.onChangeUnused(unusedFields)}
                        generateNodeProps={({ node, path }) => ({
                            title: (
                                <span className='testing'>
                                    {node.title}
                                    {/* {renderButton(node.title)} */}
                                </span>
                            ),
                            // subtitle: (

                            // ),
                        })}
                    />
                </div>
                <div style={{ display: 'inline-block', height: '100vh', width: '55%' }}>
                    <SortableTree
                        // key={this.state.treeData.length}
                        treeData={this.state.treeData}
                        getNodeKey={({ node }) => node.id}
                        dndType='externalNodeType'
                        maxDepth={3}
                        canDrop={canDropTree}
                        // onDragStateChanged={onDragStateChanged}
                        onChange={treeData => this.onChangeTree(treeData)}
                        generateNodeProps={({ node, path }) => ({
                            // title: (
                            //     <span className='testing'>
                            //         {node.title}
                            //         {/* {renderButton(node.title)} */}
                            //     </span>
                            // ),
                            subtitle: (
                                subtitleTree(node/* .dndType */)
                            ),
                        })}
                    />
                </div>
            </div>
        );
    }
}

export default Dnd;