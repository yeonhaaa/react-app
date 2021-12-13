



import './App.css';
import { Component } from 'react';
import { Subject } from './Subject';
import { TOC } from './TOC';
import { ReadContent } from './ReadContent';
import Control from './Control'; // export default라 중괄호 없이 import
import CreateContent from './CreateContent';
import UpdateContent from './UpdateContent';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subject: { title: 'WEB', sub: 'World Wide Web!' },
      contents: [
        { id: 1, title: 'HTML2', desc: 'HTML is for information.' },
        { id: 2, title: 'CSS2', desc: 'CSS is for design.' },
        { id: 3, title: 'JavaScript2', desc: 'JavaScript is for interactive.' }
      ],
      mode: 'welcome',  // html
      welcome: { title: 'welcome', desc: 'Hello, React' }
    }
  }
  // 조회와 수정 컴포넌트가 공통으로 사용하기 위해서 (여러번 호출 되니까)
  findContentById() {
    //선택된 요소(html, css, js)의 id에 해당하는 객체 찾기
    let content;
    for (let i = 0; i < this.state.contents.length; i++) {
      if (this.state.id == this.state.contents[i].id) {
        content = this.state.contents[i];
        break;
      }
    }
    return content;
  }

  render() {
    let title, desc;
    let article;
    if (this.state.mode == 'welcome') {
      title = this.state.welcome.title;
      desc = this.state.welcome.desc;

    } else if (this.state.mode == 'update') {
      const content = this.findContentById();
      console.log(content);
      if(content == undefined) {
        alert('제목선택');
      } else {
        title = content.title;
        desc = content.desc;
        article = <UpdateContent title={title} desc={desc}
          onSubmit={function (title, desc) {
            content.title = title;
            content.desc = desc;
            this.setState({ mode: 'read' });
          }.bind(this)}></UpdateContent>
      }

    } else if (this.state.mode == 'read') {
      const content = this.findContentById();
      title = content.title;
      desc = content.desc;

    } else if (this.state.mode == 'create') {
      article = <CreateContent
        onSubmit={function (title, desc) {
          console.log(title, desc);
          this.state.contents.push({
            id: this.state.contents.length + 1,
            title: title,
            desc: desc
          });
          this.setState({
            contents: this.state.contents
          })
        }.bind(this)}></CreateContent>
    }
    
    return (   // JSX
      <div className="App">
        <Subject
          title={this.state.subject.title}
          sub={this.state.subject.sub}></Subject>

        <TOC onChangePage={
          (value) => {
            this.setState({ id: value, mode: 'read' })
          }

        } contents={this.state.contents}></TOC>

        <Control onChangeMode={function (mode) {
          if (mode === 'delete') {
            const contents = this.state.contents;
            if (window.confirm('really?')) {
              for (let i = 0; i < contents.length; i++) {
                if (contents[i].id === this.state.id) {
                  contents.splice(i, 1);
                }
              }
            }
            this.setState({
              mode: 'welcome', contents: contents
            });
          } else {
            this.setState({ mode: mode });
          }
        }.bind(this)}></Control>

        <ReadContent title={title} desc={desc}></ReadContent>

        {article}
      </div>
    );
  }
}

// function App() {
//   return (   // JSX
//     <div className="App">
//       <table border='1'>
//         <tr>
//           <td>1</td><td>2</td>
//         </tr>
//       </table>
//     </div>
//   );
// }

export default App;
