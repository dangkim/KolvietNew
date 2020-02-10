export function createLocations() {
    const locations = [
        { value: 'Ho Chi Minh', label: 'TPHCM' },
        { value: 'Hanoi, Vietnam', label: 'Hà Nội' },//Ha noi, Vietnam
        { value: 'An Giang', label: 'An Giang' },// Long Xuyen, Cho Moi, Chaudok
        { value: 'Ba Ria', label: 'Bà Rịa' },// Bà Rịa
        { value: 'Vung Tau', label: 'Vũng Tàu' },// Vũng Tàu
        { value: 'Bac Lieu', label: 'Bạc Liêu' },// Bạc Liêu
        { value: 'Bac Kan', label: 'Bắc Kạn' }, //Bắc Kạn
        { value: 'Bac Giang', label: 'Bắc Giang' },
        { value: 'Bắc Ninh', label: 'Bắc Ninh' },
        { value: 'Bến Tre', label: 'Bến Tre' },
        { value: 'Binh Duong', label: 'Bình Dương' },// Thu Dau Mot; Di An, Ben Cat
        { value: 'Binh Đinh', label: 'Bình Định' },// Quy Nhon; An Nhon, Tuy Phuoc
        { value: 'Binh Phuoc', label: 'Bình Phước' },//Bình Phước, Dong Xoai
        { value: 'Binh Thuan', label: 'Bình Thuận' },// Phan thiet, Phu Binh, Lagi, Tuy Phong
        { value: 'Ca Mau', label: 'Cà Mau' },// Nam can, Hoa Thanh, Tam Giang, Tan Loc, Thới Bình, Tan Thanh, Cai Nuoc
        { value: 'Cao Bang', label: 'Cao Bằng' },// Ha Lang, Ban Gioc, Trung Khanh Phu, Phuc Hoa, Quang Uyen, Bao Lac, Hoa An, Cao Binh
        { value: 'Can Tho', label: 'Cần Thơ' },// Thot Not, Cai Rang, Binh Thuy, Ô Môn, Rach Goi, Long My
        { value: 'Đa Nang', label: 'Đà Nẵng' },// Tan Hiep, Hòa Vang, Tung Son, An Thuong, Xuan Thieu, Tinh Thuy, Ba Na
        { value: 'Đắk Lắk', label: 'Đắk Lắk' },// Buon Lac Duong, Buon Lach Lo, Buon Lach Rung
        { value: 'Đak Nong', label: 'Đắk Nông' },//
        { value: 'Điện Biên', label: 'Điện Biên' },
        { value: 'Đồng Nai', label: 'Đồng Nai' },// Xuân Lộc, Biên Hòa, Long Khanh, Trang Bom
        { value: 'Đồng Tháp', label: 'Đồng Tháp' },//  Tan Binh, An Long, Thanh Bình, Tràm Chim, Thap Muoi, Cao Lãnh, Lai Vung, Hồng Ngự
        { value: 'Gia Lai', label: 'Gia Lai' },// Plei Kly, Thanh An, An Khê, Plei Tpang, Pleiku, Phu Thien, Cheo Reo, Mang Yang, Kon Plong
        { value: 'Hà Giang', label: 'Hà Giang' },// Hà Tiên, Meo Vac, Quan Ba, Xin Man, Nam Giang
        { value: 'Hà Nam', label: 'Hà Nam' },// Binh Luc, Nam Ninh, Kim Bang, My Loc, Phu Ly
        { value: 'Hà Tây', label: 'Hà Tây' },// Son Tay
        { value: 'Hà Tĩnh', label: 'Hà Tĩnh' },// Son Tinh, Ky Anh, Cam Xuyen, Thach Ha
        { value: 'Hải Dương', label: 'Hải Dương' },// Hai Hung
        { value: 'Hai Phong', label: 'Hải Phòng' },// Cat Hai, Vinh Bao, Cát Bà, Pha Le, Phuc Le, Hoa Nghia, 
        { value: 'Hòa Bình', label: 'Hòa Bình' }, // Lac Son, Mai Châu, Minh Hóa, Tuyên Hóa    
        { value: 'Hung Yen', label: 'Hưng Yên' },// 
        { value: 'Khánh Hòa', label: 'Khánh Hòa' },// Nha Trang, Cam Ranh, Van Ninh, Ninh Hoa, Phu Hoa, Phu Khanh
        { value: 'Kiến Giang', label: 'Kiên Giang' },// Rach Gia, Hà Tiên, Vinh Tuong, Rach Soi, Lai Son, Phu Phuoc, Vinh Thuan
        { value: 'Kon Tum', label: 'Kon Tum' },// 
        { value: 'Lai Chau', label: 'Lai Châu' },
        { value: 'Lào Cai', label: 'Lào Cai' },// Sa Pa, 
        { value: 'Lạng Sơn', label: 'Lạng Sơn' },// Loc Binh, Huu Lung
        { value: 'Lâm Đồng', label: 'Lâm Đồng' },// Phuong Lam, Da Lat, Bao Loc, Di Linh, Xuan Truong, 
        { value: 'Long An', label: 'Long An' },// Tân An, Long Hoa, An loc
        { value: 'Nam Định', label: 'Nam Định' },// Vu Ban, Hai Hau, Giao thuy, Nghia Hung
        { value: 'Nghệ An', label: 'Nghệ An' },// Vinh, Nghi Loc, Dien Chau, Cua Lo, Tuong Duong, Quy Hop, Tan Ky, Quynh Luu, Thanh Chuong
        { value: 'Ninh Bình', label: 'Ninh Bình' },// Quynh Luu, Gia Loc, Hàm Ninh, Gia Bình
        { value: 'Ninh Thuận', label: 'Ninh Thuận' },// Phan Rang, Ca Na, Phan Rang, Thuan Thanh
        { value: 'Phú Thọ', label: 'Phú Thọ' },// Viet Tri, Cam Khe, Ha Hoa, Thanh Ba
        { value: 'Phú Yên', label: 'Phú Yên' },// Tuy Hòa, Phu Hoa, Tuy An, Phù Yên
        { value: 'Quảng Bình', label: 'Quảng Bình' },// Đồng Hới, Minh Hóa, Bo Trach
        { value: 'Quảng Nam', label: 'Quảng Nam' },// Tam Ky, Hội An
        { value: 'Quang Ngai', label: 'Quảng Ngãi' },// 
        { value: 'Quảng Ninh', label: 'Quảng Ninh' },// Ha Long, Móng Cái, Uông Bí, Cam Pha
        { value: 'Quảng Trị', label: 'Quảng Trị' },// Gio Linh, Vinh Linh, Dong Ha, Lao Bao, My Thuy, Trieu Phong
        { value: 'Soc Trang', label: 'Sóc Trăng' },
        { value: 'Son La', label: 'Sơn La' },// La Son, 
        { value: 'Tây Ninh', label: 'Tây Ninh' },// Trang Bang, Dau Tieng
        { value: 'Thái Bình', label: 'Thái Bình' },// Thai Thuy, Tien Hai
        { value: 'Thái Nguyên', label: 'Thái Nguyên' }, // Phú Bình, Võ Nhai
        { value: 'Thanh Hóa', label: 'Thanh Hóa' },// Nga Son, Thach Thanh
        { value: 'Hue, Vietnam', label: 'Huế' },//
        { value: 'Tiền Giang', label: 'Tiền Giang' },// My Tho, Cai Lay, Cho Gao
        { value: 'Tra Vinh', label: 'Trà Vinh' },// Tieu Can, Ba Don, Vinh Chau
        { value: 'Tuyên Quang', label: 'Tuyên Quang' },// Tuyên Hóa, Chiêm Hóa, Son Duong, Nghia Lo, Na Hang
        { value: 'Vĩnh Long', label: 'Vĩnh Long' },// Vung Liem
        { value: 'Vĩnh Phúc', label: 'Vĩnh Phúc' },// Bac Binh, Yen Lap, Lap Thach
        { value: 'Yên Bái', label: 'Yên Bái' },// Mu Cang Chai, Tram Tau
    ];
    return locations;
}

export function createInterestings() {
    const interestings = [
        { value: 'Sport', label: 'Sport' },
        { value: 'Healthy', label: 'Healthy' },
        { value: 'Fashion', label: 'Fashion' },
        { value: 'Music', label: 'Music' },
        { value: 'Foods', label: 'Foods' },
    ];
    return interestings;
}

export function createJobs() {
    const jobs = [
        { value: 'Share Link', label: 'Share Link' },
        { value: 'Post Image', label: 'Post Image' },
        { value: 'Live Stream', label: 'Live Stream' },
        { value: 'Check In', label: 'Check In' },
        { value: 'Video', label: 'Video' },
    ];
    return jobs;
}

export function createGender() {
    const gender = [
        { value: 1, label: 'Nam' },
        { value: 2, label: 'Nữ' },
        { value: 3, label: 'Mọi Giới' },
    ];
    return gender;
}

export function createGenderSearching() {
    const gender = [
        { value: "Male", label: 'Nam' },
        { value: "Nữ", label: 'Nữ' },
        { value: "NA", label: 'Mọi Giới' },
    ];
    return gender;
}

export function createStatusOfCampaign() {
    const statusOfCampaign = [
        { value: 1, label: 'Pending' },
        { value: 2, label: 'Started' },
        { value: 3, label: 'Done' },
    ];
    return statusOfCampaign;
}