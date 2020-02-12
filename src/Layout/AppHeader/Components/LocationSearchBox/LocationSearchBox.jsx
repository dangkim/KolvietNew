import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import { createLocations } from '../../../../_models/CommonModels';
//import cx from 'classnames';
//import Autocomplete from 'react-autocomplete'

class LocationSearchBox extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activeSearch: false,
            searchValue: '',
            selectedOptionLocation: {},
            isClearable: true,
        };

        this.handleOptionLocationChange = this.handleOptionLocationChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        
    }

    handleOptionLocationChange = selectedOptionLocation => {
        //debugger;
        window.scroll(0, 100);
        let items = [];
        const searchValue = selectedOptionLocation ? selectedOptionLocation.label : ''
        if (searchValue !== '') {            
            if (searchValue === 'TPHCM') {
                items.push('Ho Chi Minh');
            }
            else if (searchValue === 'Hà Nội') {
                items.push('Hanoi');
                items.push('Hà Nội');
                items.push('Ha noi');
            }
            else if (searchValue === 'An Giang') {
                items.push('An Giang');
                items.push('Long Xuyen');
                items.push('Cho Moi');
                items.push('Chaudok');
            }
            else if (searchValue === 'Bà Rịa') {
                items.push('Bà Rịa');
                items.push('Ba Ria');
            }
            else if (searchValue === 'Vũng Tàu') {
                items.push('Vũng Tàu');
                items.push('Vung Tau');
            }
            else if (searchValue === 'Bạc Liêu') {
                items.push('Bạc Liêu');
                items.push('Bac Lieu');
            }
            else if (searchValue === 'Bắc Kạn') {
                items.push('Bắc Kạn');
                items.push('Bac Kan');
            }
            else if (searchValue === 'Bắc Giang') {
                items.push('Bắc Giang');
                items.push('Bac Giang');
            }
            else if (searchValue === 'Bắc Ninh') {
                items.push('Bac Ninh');
            }
            else if (searchValue === 'Bến Tre') {
                items.push('Bến Tre');
            }
            else if (searchValue === 'Bình Dương') {
                items.push('Binh Duong');
                items.push('Bình Dương');
                items.push('Thu Dau Mot');
                items.push('Di An');
                items.push('Ben Cat');
                // Binh Duong, Thu Dau Mot; Di An, Ben Cat
            }
            else if (searchValue === 'Bình Định') {
                items.push('Binh Dinh');
                items.push('Bình Định');
                items.push('Quy Nhon');
                items.push('Qui Nhon');
                items.push('An Nhon');
                items.push('Tuy Phuoc');
                //Binh Dinh, Quy Nhon; An Nhon, Tuy Phuoc
            }
            else if (searchValue === 'Bình Phước') {
                items.push('Binh Phuoc');
                items.push('Bình Phước');
                items.push('Dong Xoai');
                //Binh Phuoc, Bình Phước, Dong Xoai
            }
            else if (searchValue === 'Bình Thuận') {
                items.push('Binh Thuan');
                items.push('Bình Thuận');
                items.push('Phan Thiet');
                items.push('Phu Binh');
                items.push('Lagi');
                items.push('Tuy Phong');
                //Binh Thuan, Phan thiet, Phu Binh, Lagi, Tuy Phong
            }
            else if (searchValue === 'Cà Mau') {
                items.push('Ca Mau');
                items.push('Cà Mau');
                items.push('Nam Can');
                items.push('Hoa Thanh');
                items.push('Tam Giang');
                items.push('Tan Loc');
                items.push('Thới Bình');
                items.push('Tan Thanh');
                items.push('Cai Nuoc');
                //Ca Mau, Nam can, Hoa Thanh, Tam Giang, Tan Loc, Thới Bình, Tan Thanh, Cai Nuoc
            }
            else if (searchValue === 'Cao Bằng') {
                items.push('Cao Bang');
                items.push('Cao Bằng');
                items.push('Ha Lang');
                items.push('Ban Gioc');
                items.push('Trung Khanh Phu');
                items.push('Phuc Hoa');
                items.push('Quang Uyen');
                items.push('Bao Lac');
                items.push('Hoa An');
                items.push('Cao Binh');
                //Cao Bang, Ha Lang, Ban Gioc, Trung Khanh Phu, Phuc Hoa, Quang Uyen, Bao Lac, Hoa An, Cao Binh
            }
            else if (searchValue === 'Cần Thơ') {
                items.push('Can Tho');
                items.push('Cần Thơ');
                items.push('Thot Not');
                items.push('Cai Rang');
                items.push('Binh Thuy');
                items.push('Ô Môn');
                items.push('Rach Goi');
                items.push('Long My');
                //Can Tho, Thot Not, Cai Rang, Binh Thuy, Ô Môn, Rach Goi, Long My
            }
            else if (searchValue === 'Đà Nẵng') {
                items.push('Da Nang');
                items.push('Đà Nẵng');
                items.push('Tan Hiep');
                items.push('Hòa Vang');
                items.push('Tung Son');
                items.push('An Thuong');
                items.push('Xuan Thieu');
                items.push('Tinh Thuy');
                items.push('Ba Na');
                //Da Nang, Tan Hiep, Hòa Vang, Tung Son, An Thuong, Xuan Thieu, Tinh Thuy, Ba Na
            }
            else if (searchValue === 'Đắk Lắk') {
                items.push('Đắk Lắk');
                items.push('Buon Lac Duong');
                items.push('Buon Lach Lo');
                items.push('Buon Lach Rung');
                items.push('Buon Me Thuot');
                items.push('Chi Lang');

                //Đắk Lắk, Buon Lac Duong, Buon Lach Lo, Buon Lach Rung
            }
            else if (searchValue === 'Đắk Nông') {
                items.push('Đak Nong');
                items.push('Đắk Nông');
            }
            else if (searchValue === 'Điện Biên') {
                items.push('Điện Biên');
            }
            else if (searchValue === 'Đồng Nai') {
                //Đồng Nai, Xuân Lộc, Biên Hòa, Long Khanh, Trang Bom
                items.push('Đồng Nai');
                items.push('Xuân Lộc');
                items.push('Biên Hòa');
                items.push('Long Khanh');
                items.push('Trang Bom');
            }
            else if (searchValue === 'Đồng Tháp') {
                //  Tan Binh, An Long, Thanh Bình, Tràm Chim, Thap Muoi, Cao Lãnh, Lai Vung, Hồng Ngự
                items.push('Đồng Tháp');
                items.push('Tan Binh');
                items.push('An Long');
                items.push('Thanh Bình');
                items.push('Tràm Chim');
                items.push('Thap Muoi');
                items.push('Cao Lãnh');
                items.push('Lai Vung');
                items.push('Hồng Ngự');
            }
            else if (searchValue === 'Bắc Kạn') {
                items.push('Bắc Kạn');
            }
            else if (searchValue === 'Gia Lai') {
                items.push('Gia Lai');
                items.push('Plei Kly');
                items.push('Thanh An');
                items.push('An Khê');
                items.push('Plei Tpang');
                items.push('Pleiku');
                items.push('Phu Thien');
                items.push('Cheo Reo');
                items.push('Mang Yang');
                items.push('Kon Plong');
                //Plei Kly, Thanh An, An Khê, Plei Tpang, Pleiku, Phu Thien, Cheo Reo, Mang Yang, Kon Plong
            }
            else if (searchValue === 'Hà Giang') {
                items.push('Hà Giang');
                items.push('Hà Tiên');
                items.push('Meo Vac');
                items.push('Quan Ba');
                items.push('Xin Man');
                items.push('Nam Giang');
                // Hà Tiên, Meo Vac, Quan Ba, Xin Man, Nam Giang
            }
            else if (searchValue === 'Hà Nam') {
                items.push('Hà Nam');
                items.push('Binh Luc');
                items.push('Nam Ninh');
                items.push('Kim Bang');
                items.push('My Loc');
                items.push('Phu Ly');
                // Binh Luc, Nam Ninh, Kim Bang, My Loc, Phu Ly
            }
            else if (searchValue === 'Hà Tây') {
                items.push('Hà Tây');
                items.push('Son Tay');
                //Hà Tây, Son Tay
            }
            else if (searchValue === 'Hà Tĩnh') {
                items.push('Hà Tĩnh');
                items.push('Son Tinh');
                items.push('Ky Anh');
                items.push('Cam Xuyen');
                items.push('Thach Ha');
                // Son Tinh, Ky Anh, Cam Xuyen, Thach Ha
            }
            else if (searchValue === 'Hải Dương') {
                items.push('Hải Dương');
                items.push('Hai Hung');
                // Hai Hung
            }
            else if (searchValue === 'Hải Phòng') {
                items.push('Cat Hai');
                items.push('Vinh Bao');
                items.push('Cát Bà');
                items.push('Pha Le');
                items.push('Phuc Le');
                items.push('Hoa Nghia');
                // Cat Hai, Vinh Bao, Cát Bà, Pha Le, Phuc Le, Hoa Nghia, 
            }
            else if (searchValue === 'Hòa Bình') {
                items.push('Hòa Bình');
                items.push('Lac Son');
                items.push('Mai Châu');
                items.push('Minh Hóa');
                items.push('Tuyên Hóa');
                // Lac Son, Mai Châu, Minh Hóa, Tuyên Hóa 
            }
            else if (searchValue === 'Hưng Yên') {
                items.push('Hưng Yên');
                items.push('Hung Yen');
                // Hưng Yên, Hung Yen
            }
            else if (searchValue === 'Khánh Hòa') {
                items.push('Khánh Hòa');
                items.push('Nha Trang');
                items.push('Cam Ranh');
                items.push('Van Ninh');
                items.push('Ninh Hoa');
                items.push('Phu Hoa');
                items.push('Phu Khanh');

                //'Khánh Hòa' },// Nha Trang, Cam Ranh, Van Ninh, Ninh Hoa, Phu Hoa, Phu Khanh
            }
            else if (searchValue === 'Kiên Giang') {
                items.push('Kiên Giang');
                items.push('Rach Gia');
                items.push('Hà Tiên');
                items.push('Vinh Tuong');
                items.push('Rach Soi');
                items.push('Lai Son');
                items.push('Phu Phuoc');
                items.push('Vinh Thuan');
                //'Kiên Giang' },// Rach Gia, Hà Tiên, Vinh Tuong, Rach Soi, Lai Son, Phu Phuoc, Vinh Thuan
            }
            else if (searchValue === 'Kon Tum') {
                items.push('Kon Tum');
                //'Kon Tum', label: 'Kon Tum'
            }
            else if (searchValue === 'Lai Châu') {
                items.push('Lai Châu');
                items.push('Lai Chau');
                //'Lai Chau', label: 'Lai Châu' },
            }
            else if (searchValue === 'Lào Cai') {
                items.push('Lào Cai');
                items.push('Sa Pa');
                //'Lào Cai' },// Sa Pa, 
            }
            else if (searchValue === 'Lạng Sơn') {
                items.push('Lạng Sơn');
                items.push('Loc Binh');
                items.push('Huu Lung');
                //'Lạng Sơn' },// Loc Binh, Huu Lung
            }
            else if (searchValue === 'Lâm Đồng') {
                items.push('Lâm Đồng');
                items.push('Phuong Lam');
                items.push('Da Lat');
                items.push('Bao Loc');
                items.push('Di Linh');
                items.push('Xuan Truong');
                //'Lâm Đồng' },// Phuong Lam, Da Lat, Bao Loc, Di Linh, Xuan Truong, 
            }
            else if (searchValue === 'Long An') {
                items.push('Tân An');
                items.push('Long An');
                items.push('Long Hoa');
                items.push('An Loc');
                //'Long An' },// Tân An, Long Hoa, An loc
            }
            else if (searchValue === 'Nam Định') {
                items.push('Nam Định');
                items.push('Vu Ban');
                items.push('Hai Hau');
                items.push('Giao Thuy');
                items.push('Nghia Hung');
                //'Nam Định' },// Vu Ban, Hai Hau, Giao Thuy, Nghia Hung
            }
            else if (searchValue === 'Nghệ An') {
                items.push('Nghệ An');
                items.push('Vinh');
                items.push('Nghi Loc');
                items.push('Dien Chau');
                items.push('Cua Lo');
                items.push('Tuong Duong');
                items.push('Quy Hop');
                items.push('Tan Ky');
                items.push('Quynh Luu');
                items.push('Thanh Chuong');
                //'Nghệ An' },// Vinh, Nghi Loc, Dien Chau, Cua Lo, Tuong Duong, Quy Hop, Tan Ky, Quynh Luu, Thanh Chuong
            }
            else if (searchValue === 'Ninh Bình') {
                items.push('Ninh Bình');
                items.push('Quynh Luu');
                items.push('Gia Loc');
                items.push('Hàm Ninh');
                items.push('Gia Bình');
                //'Ninh Bình' },// Quynh Luu, Gia Loc, Hàm Ninh, Gia Bình
            }
            else if (searchValue === 'Ninh Thuận') {
                items.push('Ninh Thuận');
                items.push('Phan Rang');
                items.push('Ca Na');
                items.push('Thuan Thanh');
                //'Ninh Thuận' },// Phan Rang, Ca Na, Phan Rang, Thuan Thanh
            }
            else if (searchValue === 'Phú Thọ') {
                items.push('Phú Thọ');
                items.push('Viet Tri');
                items.push('Cam Khe');
                items.push('Ha Hoa');
                items.push('Thanh Ba');
                //'Phú Thọ' },// Viet Tri, Cam Khe, Ha Hoa, Thanh Ba
            }
            else if (searchValue === 'Phú Yên') {
                items.push('Phú Yên');
                items.push('Tuy Hòa');
                items.push('Phu Hoa');
                items.push('Tuy An');
                items.push('Phù Yên');
                //'Phú Yên' },// Tuy Hòa, Phu Hoa, Tuy An, Phù Yên
            }
            else if (searchValue === 'Quảng Bình') {
                items.push('Quảng Bình');
                items.push('Đồng Hới');
                items.push('Minh Hóa');
                items.push('Bo Trach');
                //'Quảng Bình' },// Đồng Hới, Minh Hóa, Bo Trach
            }
            else if (searchValue === 'Quảng Nam') {
                items.push('Quảng Nam');
                items.push('Tam Ky');
                items.push('Hội An');
                //'Quảng Nam' },// Tam Ky, Hội An
            }
            else if (searchValue === 'Quảng Ngãi') {
                items.push('Quang Ngai');
                items.push('Quảng Ngãi');
                //'Quang Ngai', label: 'Quảng Ngãi'
            }
            else if (searchValue === 'Quảng Ninh') {
                items.push('Quảng Ninh');
                items.push('Ha Long');
                items.push('Móng Cái');
                items.push('Uông Bí');
                items.push('Cam Pha');
                //'Quảng Ninh' },// Ha Long, Móng Cái, Uông Bí, Cam Pha
            }
            else if (searchValue === 'Quảng Trị') {
                items.push('Quảng Trị');
                items.push('Gio Linh');
                items.push('Vinh Linh');
                items.push('Dong Ha');
                items.push('Lao Bao');
                items.push('My Thuy');
                items.push('Trieu Phong');
                // 'Quảng Trị' },// Gio Linh, Vinh Linh, Dong Ha, Lao Bao, My Thuy, Trieu Phong
            }
            else if (searchValue === 'Sóc Trăng') {
                items.push('Soc Trang');
                items.push('Sóc Trăng');
                //'Soc Trang', label: 'Sóc Trăng'
            }
            else if (searchValue === 'Sơn La') {
                items.push('Son La');
                items.push('Sơn La');
                items.push('La Son');
                // 'Son La', label: 'Sơn La' },// La Son, 
            }
            else if (searchValue === 'Tây Ninh') {
                items.push('Tây Ninh');
                items.push('Trang Bang');
                items.push('Dau Tieng');
                // 'Tây Ninh' },// Trang Bang, Dau Tieng
            }
            else if (searchValue === 'Thái Bình') {
                items.push('Thái Bình');
                items.push('Thai Thuy');
                items.push('Tien Hai');
                //'Thái Bình' },// Thai Thuy, Tien Hai
            }
            else if (searchValue === 'Thái Nguyên') {
                items.push('Thái Nguyên');
                items.push('Phú Bình');
                items.push('Võ Nhai');
                // 'Thái Nguyên' }, // Phú Bình, Võ Nhai
            }
            else if (searchValue === 'Thanh Hóa') {
                items.push('Thanh Hóa');
                items.push('Nga Son');
                items.push('Thach Thanh');
                // 'Thanh Hóa' },// Nga Son, Thach Thanh
            }
            else if (searchValue === 'Huế') {
                items.push('Hue, Vietnam');
                //'Hue, Vietnam'
            }
            else if (searchValue === 'Tiền Giang') {
                items.push('Tiền Giang');
                items.push('My Tho');
                items.push('Cai Lay');
                items.push('Cho Gao');
                // 'Tiền Giang' },// My Tho, Cai Lay, Cho Gao
            }
            else if (searchValue === 'Trà Vinh') {
                items.push('Trà Vinh');
                items.push('Tieu Can');
                items.push('Ba Don');
                items.push('Vinh Chau');
                // 'Trà Vinh' },// Tieu Can, Ba Don, Vinh Chau
            }
            else if (searchValue === 'Tuyên Quang') {
                items.push('Tuyên Quang');
                items.push('Tuyên Hóa');
                items.push('Chiêm Hóa');
                items.push('Son Duong');
                items.push('Nghia Lo');
                items.push('Na Hang');
                //'Tuyên Quang' },// Tuyên Hóa, Chiêm Hóa, Son Duong, Nghia Lo, Na Hang
            }
            else if (searchValue === 'Vĩnh Long') {
                items.push('Vĩnh Long');
                items.push('Vung Liem');
                //'Vĩnh Long' },// Vung Liem
            }
            else if (searchValue === 'Vĩnh Phúc') {
                items.push('Vĩnh Phúc');
                items.push('Bac Binh');
                items.push('Yen Lap');
                items.push('Lap Thach');
                //'Vĩnh Phúc' },// Bac Binh, Yen Lap, Lap Thach
            }
            else if (searchValue === 'Yên Bái') {
                items.push('Yên Bái');
                items.push('Mu Cang Chai');
                items.push('Tram Tau');
                //'Yên Bái' },// Mu Cang Chai, Tram Tau
            }
        }
        this.setState({ selectedOptionLocation });
        this.props.handlerSearchFromParent(items)
    };

    handleChange(event) {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    }

    // keyPressed(event) {
    //     debugger;
    //     const searchValue = event.value;
    //     //const { activeSearch, searchValue } = this.state
    //     if (searchValue) {
    //         this.props.handlerSearchFromParent(searchValue)
    //         this.setState({ selectedValue: searchValue });
    //     }
    // }

    render() {
        const { selectedOptionLocation, isClearable } = this.state
        const options = createLocations();
        return (
            <Fragment>
                <div style={{ minWidth: '180px' }}>
                    <Select
                        maxMenuHeight={200}
                        isClearable={isClearable}
                        //value={selectedOptionLocation}
                        onChange={this.handleOptionLocationChange}
                        isMulti={false}
                        placeholder="Location..."
                        options={options} />
                </div>

            </Fragment>
        )
    }
}
function mapStateToProps(state) {
    //
    const { campaigns, influencers, locations, interestings, jobCategories, jobs, brands } = state;
    //const { brand } = influencers;
    return {
        //loggingIn,
        brands,
        jobs,
        jobCategories,
        interestings,
        locations,
        campaigns,
        influencers
    };
}

const connectedLocationSearchBox = connect(mapStateToProps)(LocationSearchBox);
export { connectedLocationSearchBox as LocationSearchBox };
//export default SearchBox;