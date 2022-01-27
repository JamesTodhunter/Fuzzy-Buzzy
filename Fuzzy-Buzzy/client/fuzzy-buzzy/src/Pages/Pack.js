import React, { Component } from 'react';
import { Link } from 'react-router-dom';


export default class Pack extends Component {
    constructor(props) {
        super(props)
        this.sate = {

        }
    }

    myPack = () => {

    }

    render() {
        return (
            <div className="main">
                <div className="mainDiv">
                    <h1>Hello Again as your faithful Dnd helper, I Fuzzy Buzzy have
                        gathered a few extra tools here in my pack to aid you further on
                        your journey hope these help.
                    </h1>

                    <Link>
                        <ul>
                            <li>
                                <a href="http://www.zerohitpoints.com/Guides/DnD-5-Character-Creation-Checklist">CheckList</a>
                                <a href="https://media.wizards.com/2021/dnd/downloads/charactersheet_ravenloft.pdf">Character Sheet</a>
                                <a href="https://www.dndbeyond.com/classes">Classes</a>
                                <a href="https://www.dndbeyond.com/backgrounds">Background</a>
                                <a href="https://www.dndbeyond.com/races">Races</a>
                                <a href="https://dnd5e.info/beyond-1st-level/alignment/">Alignments</a>
                                <a href="http://weirdzine.com/wp-content/uploads/2015/09/Personality-Traits.pdf">Personality-Traits</a>
                                <a href="https://media.spokesman.com/documents/2015/07/quirks_5fa8I0K.pdf">Quirls</a>
                                <a href="http://weirdzine.com/wp-content/uploads/2015/09/Ideals.pdf">Ideals</a>
                                <a href="http://weirdzine.com/wp-content/uploads/2015/09/Bonds.pdf">Bonds</a>
                                <a href="http://weirdzine.com/wp-content/uploads/2015/09/Flaws.pdf">Flaws</a>
                                <a href="https://5thsrd.org/character/languages/">Languages</a>
                                <a href="https://5thsrd.org/adventuring/equipment/equipment_packs/">Equipment Packs</a>
                                <a href="https://dndtopics.com/items/starting-gold/">Starting Gold</a>
                            </li>
                        </ul>
                    </Link>
                </div>
            </div>
        )
    }
}