
import React from 'react';
import Swiper from 'react-id-swiper';
import {
    Spin,
    Icon
} from 'antd';

export default class Zoom extends React.Component {
    static defaultProps = {
        url: '', //单张图片或者数组
        del: false,// 是否有删除按钮
    }
    constructor(props) {
        super(props);
        this.state = {
            show:false,
            url:''
        };
    }
    componentDidMount() {
        this.initUrl();
    }
    componentWillReceiveProps(nextProps){
        this.initUrl();
    }
    // 初始化数据
    initUrl = () => {
        let {url,show} = this.props;
        if (typeof url === 'string') {
            // 单个变量
            var temp = url;
            url = [];
            url.push({url:temp});
        } else if (url && url.constructor === Array) {
            // 数组
            url = url.map((v,k) => {
                var db = {url:v};
                return db;
            });
        }else if (url === null){
            url = [];
        }
        let cw = document.documentElement.clientWidth;
        let ch = document.documentElement.clientWidth;
        !show ? url && url.map((v, k) => {
            var img_url = `${v.url}`;
            var img = new Image();
            img.src = img_url;
            img.onload = () => {
                if(img.width > img.height){
                    v.h = "auto";
                    v.w = cw*0.5;
                }else{
                    v.h = ch*0.5;
                    v.w = "auto";
                }
                k === url.length - 1 ? this.setState({url:url}) : null;
                return v;
            };
            return v;
        }) : null;
        // this.setState({url:url});
    }
    showPic = () => {
        this.setState({show:true});
    }
    handleClose = (e) => {
        if(e.target.className.indexOf('closeBox') !== -1){
            // 点击了区域外围
            this.setState({show:false});
        }
    }
    render() {
        let {show,url} = this.state;
        show ? document.body.style.overflow = 'hidden' : document.body.style.overflow = 'auto';
        const params = {
            pagination: {
                el: '.swiper-pagination',
                type: 'bullets',
                clickable: true
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
            },
            spaceBetween: 30
        };
        return (<div>
            {
                url ? url.constructor === Array ? <div>
                    {
                        url && url.map((v,k) => {
                            return <div key={v+k} style={{position:'relative',display:'inline-block',marginTop:'10px'}}>
                                <img src={v.url} alt="" onClick={this.showPic}/>
                                {
                                    this.props.del ? <span style={styles.close} onClick={(e) => this.props.close(k)}>X</span> : null
                                }
                            </div>;
                        })
                    }
                </div> : <Spin indicator={<Icon type="loading" spin />}/> : null
            }
            {
                show ? <div style={styles.div} onClick={(e) => this.handleClose(e)}>
                    <Swiper {...params}>
                        {
                            url && url.map((v,k) => {
                                return (<div style={styles.slide} key={v+k+1} className="closeBox">
                                    <img src={v.url} alt="" style={{
                                        position: 'absolute',
                                        top: '50%',
                                        left: '50%',
                                        transform: 'translate(-50%, -50%)',
                                        height:v.h,
                                        width:v.w
                                    }}/>
                                </div>);
                            })
                        }
                    </Swiper>
                </div> : null
            }
        </div>);
    }
}
const styles = {
    div: {
        position: 'fixed',
        background: 'rgba(0,0,0,.5)',
        overflow: 'hidden',
        zIndex: '9999',
        height: '100vh',
        width: '100%',
        left: '0',
        top: '0'
    },
    slide: {
        height: '100vh',
        width: '60vw',
        margin: '0 auto'
    },
    img: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
    },
    close:{
        position:'absolute',
        top:'-14px',
        right:'0',
        color:'red',
        cursor:'pointer',
        fontSize:'20px',
    }
};
