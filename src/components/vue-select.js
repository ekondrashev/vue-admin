import Base from 'vue-select/src/components/Select.vue';

export default {
	extends: Base,
	props: {
		disableSearchFilter: {
			type: Boolean,
			default: false,
		},
	},
	computed: {
		// fix: support disabling default substring search filter even if there is a custom search
		filteredOptions() {
			const options = this.disableSearchFilter ?
				this.mutableOptions.slice() :
				this.mutableOptions.filter(option => {
					if (option.hasOwnProperty(this.label))
						if (typeof option === 'object' && option.hasOwnProperty(this.label))
							return option[this.label].toLowerCase().indexOf(this.search.toLowerCase()) > -1;
						else
							return option.toLowerCase().indexOf(this.search.toLowerCase()) > -1;
					else return true;
				});
			if (this.taggable && this.search.length && !this.optionExists(this.search))
				options.unshift(this.search);
			return options;
		},
	},
	watch: {
		search() {
			// fix: trigger 'search' event with empty value
			if (this.search.length === 0) this.$emit('search', this.search, this.toggleLoading);
		},
	},
};
