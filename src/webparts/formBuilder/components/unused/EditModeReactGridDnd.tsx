import * as React from 'react';
import EditModeStep from './EditModeStep';
import EditModeDnD from './EditModeDnD';
import DndRoot from './DndRoot';
import { Dropdown, IDropdownOption, IDropdownStyles } from 'office-ui-fabric-react/lib/Dropdown';

const mcc = 'background-color:black;color:lime;';







export type Quote = {
    id: string,
    content: string,
    author: Author,
};

export type QuoteMap = {
    [key: string]: Quote[],
};

export type Author = {
    id: string,
    name: string,
    avatarUrl: string,
    url: string,
    colors: any,
};



interface ArrayConstructor {
    from<T, U>(arrayLike: ArrayLike<T>, mapfn: (v: T, k: number) => U, thisArg?: any): Array<U>;
    from<T>(arrayLike: ArrayLike<T>): Array<T>;
}









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

    public componentDidMount() {
        console.log('%c : EditMode -> componentDidMount -> this.props', mcc, this.props);
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




        const step2 = selectedList ?
            <EditModeStep
                stepNumber={2}
                stepTitle='Configure sections and fields'
            /> : <></>;

        // const dnd = selectedList ?
        //     <EditModeDnD
        //         list={selectedList}
        //     /> : <></>;
























        const jake: Author = {
            id: '1',
            name: 'Jake',
            url: 'http://adventuretime.wikia.com/wiki/Jake',
            avatarUrl: null,
            colors: {
                soft: 'gray',
                hard: 'black',
            },
        };

        const BMO: Author = {
            id: '2',
            name: 'BMO',
            url: 'http://adventuretime.wikia.com/wiki/BMO',
            avatarUrl: null,
            colors: {
                soft: 'gray',
                hard: 'black',
            },
        };

        const finn: Author = {
            id: '3',
            name: 'Finn',
            url: 'http://adventuretime.wikia.com/wiki/Finn',
            avatarUrl: null,
            colors: {
                soft: 'gray',
                hard: 'black',
            },
        };

        const princess: Author = {
            id: '4',
            name: 'Princess bubblegum',
            url: 'http://adventuretime.wikia.com/wiki/Princess_Bubblegum',
            avatarUrl: null,
            colors: {
                soft: 'gray',
                hard: 'black',
            },
        };


        const authors: Author[] = [jake, BMO, finn, princess];

        const quotes/* : Quote[] */ = [
            {
                id: '1',
                content: 'Sometimes life is scary and dark',
                author: BMO,
            },
            {
                id: '2',
                content:
                    'Sucking at something is the first step towards being sorta good at something.',
                author: jake,
            },
            {
                id: '3',
                content: "You got to focus on what's real, man",
                author: jake,
            },
            {
                id: '4',
                content: 'Is that where creativity comes from? From sad biz?',
                author: finn,
            },
            {
                id: '5',
                content: 'Homies help homies. Always',
                author: finn,
            },
            {
                id: '6',
                content: 'Responsibility demands sacrifice',
                author: princess,
            },
            {
                id: '7',
                content: "That's it! The answer was so simple, I was too smart to see it!",
                author: princess,
            },
            {
                id: '8',
                content:
                    "People make mistakes. It's all a part of growing up and you never really stop growing",
                author: finn,
            },
            {
                id: '9',
                content: "Don't you always call sweatpants 'give up on life pants,' Jake?",
                author: finn,
            },
            {
                id: '10',
                content: 'I should not have drunk that much tea!',
                author: princess,
            },
            {
                id: '11',
                content: 'Please! I need the real you!',
                author: princess,
            },
            {
                id: '12',
                content: "Haven't slept for a solid 83 hours, but, yeah, I'm good.",
                author: princess,
            },
        ];



        let idCount: number = quotes.length + 1;

        const getQuotes = (count: number): Quote[] =>
            Array.from({ length: count }, (v, k) => k).map(() => {
                const random: Quote = quotes[Math.floor(Math.random() * quotes.length)];

                const custom: Quote = {
                    ...random,
                    id: `G${idCount++}`,
                };

                return custom;
            });



        const generateQuoteMap = (quoteCount: number): QuoteMap =>
            authors.reduce(
                (previous: QuoteMap, author: Author) => ({
                    ...previous,
                    [author.name]: getQuotes(quoteCount / authors.length),
                }),
                {},
            );

        const getByAuthor = (author: Author, items: Quote[]): Quote[] =>
            items.filter((quote: Quote) => quote.author === author);

        const authorQuoteMap: QuoteMap = authors.reduce(
            (previous: QuoteMap, author: Author) => ({
                ...previous,
                [author.name]: getByAuthor(author, quotes),
            }),
            {},
        );


        const dnd = selectedList ?
            <DndRoot
                initial={authorQuoteMap}
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