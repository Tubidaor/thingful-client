import React, { Component } from 'react'
import ThingListContext from '../../contexts/ThingListContext'
import ThingApiService from '../../services/thing-api-service'
import { Section } from '../../components/Utils/Utils'
import ThingListItem from '../../components/ThingListItem/ThingListItem'
import './ThingListPage.css'
import LoginPage from '../LoginPage/LoginPage'

export default class ThingListPage extends Component {
  static contextType = ThingListContext

  componentDidMount() {
    this.context.clearError()
    ThingApiService.getThings()
      .then(this.context.setThingList)
      .catch(this.context.setError)
  }

  renderThings() {
    const { thingList = [] } = this.context
    return thingList.map(thing =>
      <ThingListItem
        key={thing.id}
        thing={thing}
      />
    )
  }

  render() {
    const { error } = this.context
    return (
      <Section list className='ThingListPage'>
        {error
          ? <LoginPage/>
          : this.renderThings()}
      </Section>
    )
  }
}
