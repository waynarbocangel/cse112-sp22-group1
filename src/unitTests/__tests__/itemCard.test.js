import {ItemCard} from '../../front-end/components/itemCard.jsx'

describe('Testing functionality of item card', () => {
    let card;
    beforeAll(() =>{
        card = new ItemCard(null,null,null,"testid");
    });

    test('check card title is properly set', () =>{
        card.setTitle("Test Title");
        expect(card.shadowRoot.getElementById('title').innerText).toEqual("Test Title");
    });

    test('check card dates is properly set: 1st -> 31st', () =>{
        card.setDate(1,31);
        expect(card.shadowRoot.getElementById('date').innerText).toEqual("1st → 31st");
    });

    test('check card dates is properly set: 1st -> 28th', () =>{
        card.setDate(1,28);
        expect(card.shadowRoot.getElementById('date').innerText).toEqual("1st → 28th");
    });

    test('check card dates is properly set: 2nd-> 23rd', () =>{
        card.setDate(2,23);
        expect(card.shadowRoot.getElementById('date').innerText).toEqual("2nd → 23rd");
    });

    test('check card id is properly set', () =>{
        expect(card.ID).toEqual("testid");
    });
})