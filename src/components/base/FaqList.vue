<template>
  <ul class="faq-list">
    <FaqItem v-for="(item, index) in faqs" :key="index" :item="item" />
  </ul>
</template>

<script>
import FaqItem from "./FaqItem.vue";

export default {
  name: "FaqList",
  components: {
    FaqItem,
  },
  data() {
    return {
      faqs: [
        {
          question: "Làm thế nào để đặt hẹn khám bệnh với bác sĩ của Unime?",
          content:
            "Bạn có thể đặt hẹn khám bệnh với bác sĩ của Unime qua ứng dụng di động, trang web hoặc điện thoại. Bạn chỉ cần chọn bác sĩ, thời gian và địa điểm phù hợp với bạn. Bạn cũng có thể hủy hoặc thay đổi lịch hẹn một cách dễ dàng.",
        },
        {
          question: "Tôi có thể khám bệnh với bác sĩ của Unime ở đâu?",
          content:
            "Unime có các văn phòng khám bệnh tại nhiều thành phố lớn trên khắp nước Mỹ, như New York, San Francisco, Los Angeles, Chicago, Boston, Washington DC và nhiều nơi khác. Bạn có thể tìm kiếm địa chỉ gần nhất với bạn trên trang web hoặc ứng dụng của Unime.",
        },
        {
          question: "Tôi cần mang theo gì khi đến khám bệnh tại Unime?",
          content:
            "Khi đến khám bệnh tại Unime, bạn cần mang theo thẻ nhận dạng có ảnh, thẻ bảo hiểm y tế (nếu có) và danh sách các thuốc bạn đang dùng hoặc đã dùng. Nếu bạn là bệnh nhân mới, bạn cũng cần hoàn thành một số biểu mẫu trực tuyến trước khi đến khám.",
        },
        {
          question: "Unime có cung cấp dịch vụ chăm sóc khẩn cấp không?",
          content:
            "Unime cung cấp dịch vụ chăm sóc khẩn cấp cho các trường hợp không nguy hiểm tính mạng, như nhiễm trùng, chấn thương, dị ứng, phát ban và nhiều trường hợp khác. Bạn có thể đến bất kỳ văn phòng khám bệnh nào của Unime trong giờ làm việc, hoặc sử dụng ứng dụng hoặc trang web để đặt lịch hẹn trong ngày. Bạn cũng có thể truy cập dịch vụ chăm sóc ảo 24/7 qua ứng dụng hoặc trang web, nơi bạn có thể trò chuyện với bác sĩ, nhận đơn thuốc hoặc được giới thiệu.",
        },
        {
          question: "Unime cung cấp những dịch vụ gì?",
          content:
            "Unime cung cấp nhiều loại dịch vụ, như chăm sóc sức khỏe cơ bản, chăm sóc phòng ngừa, chăm sóc mãn tính, sức khỏe phụ nữ, sức khỏe nam giới, nhi khoa, sức khỏe tâm thần và nhiều hơn nữa. Bạn cũng có thể truy cập một số dịch vụ chuyên khoa tại chỗ tại một số địa điểm, như da liễu, vật lý trị liệu, châm cứu và dinh dưỡng. Bạn có thể tìm hiểu thêm về các dịch vụ được cung cấp tại mỗi địa điểm trên trang web hoặc ứng dụng của Unime.",
        },
        {
          question:
            "Làm thế nào để liên hệ với Unime nếu tôi có câu hỏi hoặc quan tâm?",
          content:
            "Bạn có thể liên hệ với Unime qua điện thoại, email hoặc trò chuyện, tùy thuộc vào sở thích và khẩn cấp của bạn. Bạn có thể tìm thấy thông tin liên hệ cho mỗi địa điểm trên trang web hoặc ứng dụng của Unime, hoặc sử dụng biểu mẫu liên hệ chung hoặc số điện thoại. Bạn cũng có thể gửi một tin nhắn bảo mật cho bác sĩ của bạn qua ứng dụng hoặc trang web, và họ sẽ trả lời trong vòng một ngày làm việc.",
        },
      ],
    };
  },
};
</script>

<style scoped>
.faq-list {
  margin-top: 38px;
  width: 100%;
}
</style>
