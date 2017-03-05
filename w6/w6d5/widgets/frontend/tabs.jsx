import React from 'react';

class Headers extends React.Component {
  render() {
    let selected = this.props.selectedTab;
    let headers = this.props.tabs.map((tab, idx) => {
      let title = tab.title;
      let klass = '';
      if (idx === selected) klass = 'active';

      return (
        <section
          key={idx}
          className={`tab-header ${klass}`}
          onClick={this.props.onTabChosen.bind(null, idx)}>
          {`${title} `}
        </section>
      )
    });
    return (
      <section className="tab-headers">
        {headers}
      </section>
    )
  }
}
export default class Tabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTabIndex: 0
    };
    this.selectTab = this.selectTab.bind(this);
  }

  selectTab(idx) {
    this.setState({selectedTabIndex: idx});
  }

  render() {
    let tab = this.props.tabs[this.state.selectedTabIndex];

    return (
      <ul>
        <h1><b>Tabs</b></h1>
        <section className="tabs">
          <Headers
            selectedTab={this.state.selectedTab}
            onTabChosen={this.selectTab}
            tabs={this.props.tabs}>
          </Headers>
          <div className="tab-content">
            <article>{tab.content}</article>
          </div>
        </section>
      </ul>
    );
  }
};
