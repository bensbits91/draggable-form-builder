import * as React from 'react';
import { Stack } from 'office-ui-fabric-react/lib/Stack'
import {
    GridContextProvider,
    GridDropZone,
    GridItem,
    swap,
    move
} from 'react-grid-dnd';
import './dnd.css';


const mcc = 'background-color:orange;color:black;';

const rowHeight = 40;

export interface EditModeDnDProps {
    list;
}

export interface EditModeDnDState {
    sections?;
    sectionConfig?;
}

class EditModeDnD extends React.Component<EditModeDnDProps, EditModeDnDState> {
    constructor(props: EditModeDnDProps) {
        super(props);
        this.state = {};
    }

    public componentDidMount() {
        console.log('%c : EditModeDnD -> componentDidMount -> this.props', mcc, this.props);
        const fields = this.props.list.fields.map(f => f.Title);
        this.setState({
            sections: {
                unused: fields,
                s0: [],
                // s1: [],
            },
            sectionConfig: {
                unused: {
                    heading: 'Unused fields',
                    bgColor: '#ccc'
                },
                s0: {
                    heading: 'Section 0',
                    bgColor: 'red',
                    columns: 1
                }
            }
        });
    }

    public componentDidUpdate(prevProps: EditModeDnDProps, prevState: EditModeDnDState) {
        console.log('%c : EditModeDnD -> componentDidUpdate -> this.state', mcc, this.state);
    }

    public onChange(sourceId, sourceIndex, targetIndex, targetId) {
        console.log('%c : EditModeDnD -> onChange -> sourceId', mcc, sourceId);
        console.log('%c : EditModeDnD -> onChange -> sourceIndex', mcc, sourceIndex);
        console.log('%c : EditModeDnD -> onChange -> targetIndex', mcc, targetIndex);
        console.log('%c : EditModeDnD -> onChange -> targetId', mcc, targetId);
        const { sections } = this.state;
        if (targetId && sections) {
            const result = move(
                sections[sourceId],
                sections[targetId],
                sourceIndex,
                targetIndex
            );
            this.setState({
                sections: {
                    ...sections,
                    [sourceId]: result[0],
                    [targetId]: result[1]
                }
            });
        }
        else {
            const result = sections ? swap(sections[sourceId], sourceIndex, targetIndex) : null;
            this.setState({
                sections: {
                    ...sections,
                    [sourceId]: result
                }
            });
        }
    }


    public render() {
        const { sections, sectionConfig } = this.state;

        const sConfigUnused = sectionConfig ? sectionConfig.unused : null;
        console.log('%c : EditModeDnD -> render -> sConfigUnused', mcc, sConfigUnused);

        const leftPane = sections ?
            <div className='grid-pane left'>
                <h2>{sConfigUnused.heading}</h2>
                <GridDropZone
                    className='dropzone unused'
                    id='unused'
                    boxesPerRow={1}
                    rowHeight={rowHeight}
                    style={{ height: sections.unused.length * 40 + 80 + 'px' }}
                >
                    {sections.unused.map(field => {
                        return (
                            <GridItem
                                key={field.replace(/ /g, '')}
                                className='grid-item-wrap'
                            >
                                <div className='grid-item'>
                                    <div className='grid-item-content'>
                                        {field}
                                    </div>
                                </div>
                            </GridItem>
                        );
                    })}
                </GridDropZone>
            </div>
            : <></>;

        const rightPane = sections ?
            <div className='grid-pane right'>
                {Object.keys(sections).map(k => {
                    if (k == 'unused')
                        return;



                    const sConfig = sectionConfig[k];
                    console.log('%c : EditModeDnD -> render -> sConfig', mcc, sConfig);

                    return (
                        <>
                            <h2>{sConfig.heading}</h2>
                            <GridDropZone
                                className={'dropzone ' + k}
                                id={k}
                                boxesPerRow={1}
                                rowHeight={rowHeight}
                            >
                                {sections[k].map(field => (
                                    <GridItem
                                        key={field.replace(/ /g, '')}
                                        className='grid-item-wrap'
                                    >
                                        <div className='grid-item'>
                                            <div className='grid-item-content'>
                                                {field}
                                            </div>
                                        </div>
                                    </GridItem>
                                ))}
                            </GridDropZone>
                        </>
                    );
                })}
            </div>
            : <></>;



        const elGrid = sections ?
            <GridContextProvider onChange={this.onChange.bind(this)}>
                <Stack horizontal>



                    {leftPane}


                    {rightPane}


                </Stack>
            </GridContextProvider>
            : <></>;

        return (
            elGrid
        );
    }
}

export default EditModeDnD;