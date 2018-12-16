import React, { Component } from 'react';
import './App.css';
import jsonContacts from './contacts.json'
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      contacts: jsonContacts.slice(0,5)
      }
      //bind all the methods
   this.addContact = this.addContact.bind(this);
  }

  addContact(){
    let randomIndex = Math.floor(jsonContacts.length* Math.random())
    let randomContact =jsonContacts[randomIndex]
    // let newContacts = this.state.contacts.slice()
    // newContacts.push(randomContact)//we can push because its a copy of the state.contacts
    this.setState({
    //  contacts: newContacts
     contacts:[...this.state.contacts,randomContact]
    });
  }

  sortContacts(field){
    if(field==='name'){
      this.setState({
        contacts:this.state.contacts.slice().sort((a,b)=> (a.name > b.name ? 1 : -1))
      })
    }
    if(field==='popularity'){
      this.setState({
        contacts:this.state.contacts.slice().sort((a,b)=> (a.popularity > b.popularity ? -1 : 1))
      })
    }
  }

  deleteContact(indexToRemove){
    this.setState({
      //in (c,i) c is the current contact ,i is the current index
      contacts:this.state.contacts.filter((c,i)=>(i!==indexToRemove))
    })

  }
  render() {
    return (
      <div className="App">
       <h1>IronContacts</h1>
       
       <button onClick={this.addContact}>Add random contact</button>
       {/* arrow function binds this keyword */}
       <button onClick={()=>this.sortContacts('name')}>Sort by Name</button>
       {/* <button onClick={this.sortContacts.bind(this, 'name')}>Sort by Name</button> */}

       <button onClick={()=>this.sortContacts('popularity')}>popularity</button>
       
       <table>
         <thead>
           <th>Picture</th>
           <th>Name</th>
           <th>Popularity</th>
           <th>Action</th>

         </thead>
         <tbody>
           {this.state.contacts.map((c,i) => (
            <tr key={i}>
              <td><img src={c.pictureUrl} style={{height: 100}}/></td>
              <td>{c.name}</td>
              <td>{c.popularity.toFixed(2)}</td>
              <td><button onClick={()=>this.deleteContact(i)}>Delete</button></td>
            </tr>
            ))}
         </tbody>
       </table>
      </div>
    );
  }
}
export default App;