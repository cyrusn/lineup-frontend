<template>
  <div class="row">
    <div v-for="s in filteredStudents" :key="s.id" class="col-lg-4 col-6">
      <div class="btn-toolbar mb-2">
        <div class="btn-group me-1">
          <button
            type="button"
            class="btn btn-outline-warning"
            @click="onAddSchedule(s)"
          >
            <font-awesome-icon icon="user-plus" />
          </button>
          <button
            type="button"
            class="btn btn-outline-secondary"
            @click="onRemoveSchedule(s)"
          >
            <font-awesome-icon icon="user-minus" />
          </button>
          <button
            type="button"
            class="btn btn-outline-success"
            @click="onToggleIsNotified(s)"
          >
            <font-awesome-icon icon="bell" />
          </button>
        </div>
        <div class="btn-group">
          <div v-if="getSchedule(s)">
            <name-badge :schedule="getSchedule(s)" />
          </div>
          <div v-else>
            <button class="btn btn-outline-secondary">
              {{ s.cname || s.name.split(" ")[1] }} ({{ s.classno }})
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import NameBadge from "@/components/Common/NameBadge.vue";
import _ from "lodash";

export default {
  props: ["classcode"],
  created() {
    const option = { leading: true, trailing: false };
    const vm = this;
    const fnNames = ["onRemoveSchedule", "onAddSchedule", "onToggleIsNotified"];
    fnNames.map((fnName) => _.throttle(vm[fnName], 500, option));
  },
  components: {
    NameBadge,
  },
  computed: {
    ...mapState(["schedules", 'students']),
    filteredStudents() {
      const { classcode, students} = this;
      return _.filter(students, { classcode });
    },
  },
  methods: {
    ...mapMutations([
      "fakeRemoveSchedule",
      "fakeAddSchedule",
      "fakeIsNotified",
    ]),
    ...mapActions([
      "addSchedule",
      "removeSchedule",
      "toggleIsNotified",
    ]),
    getSchedule(student) {
      const { classcode, classno } = student;
      return _(this.schedules).find({ classcode, classno });
    },
    onRemoveSchedule(s) {
      const { classcode, classno } = s;
      const { schedules, removeSchedule, fakeRemoveSchedule } = this;

      const p = _.find(schedules, { classcode, classno });
      if (p && !p.isComplete && p.priority === 0) {
        removeSchedule(s);
        fakeRemoveSchedule({ classcode, classno });
      }
    },
    onAddSchedule(s) {
      const { classcode, classno } = s;
      const { schedules, addSchedule, fakeAddSchedule } = this;

      const p = _.find(schedules, { classcode, classno });
      if (!p) {
        addSchedule(s);
        fakeAddSchedule({ classcode, classno });
      }
    },
    onToggleIsNotified(s) {
      const { fakeIsNotified, schedules, toggleIsNotified } = this;
      const { classcode, classno } = s;

      const p = _.find(schedules, { classcode, classno });
      if (p && !p.isComplete && p.priority > 0) {
        toggleIsNotified(s);
        fakeIsNotified({ classcode, classno });
      }
    },
  },
};
</script>
