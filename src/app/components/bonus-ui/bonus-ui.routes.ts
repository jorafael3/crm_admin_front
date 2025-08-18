import { Routes } from "@angular/router";

import { ScrollableComponent } from "./scrollable/scrollable.component";
import { TreeViewComponent } from "./tree-view/tree-view.component";
import { BlockUiComponent } from "./block-ui/block-ui.component";
import { RatingComponent } from "./rating/rating.component";
import { DropzoneComponent } from "./dropzone/dropzone.component";
import { OwlCarouselComponent } from "./owl-carousel/owl-carousel.component";
import { ToastComponent } from "./toast/toast.component";
import { Sweetalert2Component } from "./sweetalert2/sweetalert2.component";
import { AnimatedModalComponent } from "./animated-modal/animated-modal.component";
import { ScrollspyComponent } from "./scrollspy/scrollspy.component";
import { DraggableCardComponent } from "./draggable-card/draggable-card.component";
import { PaginationComponent } from "./pagination/pagination.component";
import { BreadcrumbComponent } from "./breadcrumb/breadcrumb.component";
import { RatiosComponent } from "./ratios/ratios.component";
import { ImageCropComponent } from "./image-crop/image-crop.component";
import { RibbonsComponent } from "./ribbons/ribbons.component";
import { RangeSliderComponent } from "./range-slider/range-slider.component";
import { BasicCardsComponent } from "./basic-cards/basic-cards.component";
import { CreativeCardComponent } from "./creative-card/creative-card.component";
import { TimelineComponent } from "./timeline/timeline.component";

export const bonusUi: Routes = [
    {
        path: 'scrollable',
        component: ScrollableComponent,
        data: {
            title: 'Scrollable',
            breadcrumb: 'Scrollable'
        }
    },
    {
        path: 'tree',
        component: TreeViewComponent,
        data: {
            title: 'Tree view',
            breadcrumb: 'Tree view'
        }
    },
    {
        path: 'block-ui',
        component: BlockUiComponent,
        data: {
            title: 'Block Ui',
            breadcrumb: 'BlockUI'
        }
    },
    {
        path: 'rating',
        component: RatingComponent,
        data: {
            title: 'Rating',
            breadcrumb: 'Rating'
        }
    },
    {
        path: 'dropzone',
        component: DropzoneComponent,
        data: {
            title: 'Dropzone',
            breadcrumb: 'Dropzone'
        }
    },
    {
        path: 'owl-carousel',
        component: OwlCarouselComponent,
        data: {
            title: 'Owl Carousel',
            breadcrumb: 'Owl Carousel'
        }
    },
    {
        path: 'toast',
        component: ToastComponent,
        data: {
            title: 'Toasts',
            breadcrumb: 'Toasts'
        }
    },
    {
        path: 'sweetalert2',
        component: Sweetalert2Component,
        data: {
            title: 'Sweet Alerts',
            breadcrumb: 'Sweet Alerts'
        }
    },
    {
        path: 'animated-modal',
        component: AnimatedModalComponent,
        data: {
            title: 'Animated Modal',
            breadcrumb: 'Animated Modal'
        }
    },
    {
        path: 'scrollspy',
        component: ScrollspyComponent,
        data: {
            title: 'ScrollSpy',
            breadcrumb: 'ScrollSpy'
        }
    },
    {
        path: 'draggable-card',
        component: DraggableCardComponent,
        data: {
            title: 'Draggable Card',
            breadcrumb: 'Draggable Card'
        }
    },
    {
        path: 'ribbons',
        component: RibbonsComponent,
        data: {
            title: 'Ribbons',
            breadcrumb: 'Ribbons'
        }
    },
    {
        path: 'pagination',
        component: PaginationComponent,
        data: {
            title: 'Paginations',
            breadcrumb: 'Paginations'
        }
    },
    {
        path: 'breadcrumb',
        component: BreadcrumbComponent,
        data: {
            title: 'Breadcrumb',
            breadcrumb: 'Breadcrumb'
        }
    },
    {
        path: 'range-slider',
        component: RangeSliderComponent,
        data: {
            title: 'Range Slider',
            breadcrumb: 'Range Slider'
        }
    },
    {
        path: 'ratios',
        component: RatiosComponent,
        data: {
            title: 'Ratios',
            breadcrumb: 'Ratios'
        }
    },
    {
        path: 'image-cropper',
        component: ImageCropComponent,
        data: {
            title: 'Image Cropper',
            breadcrumb: 'Image Cropper'
        }
    },
    {
        path: 'basic-card',
        component: BasicCardsComponent,
        data: {
            title: 'Basic Card',
            breadcrumb: 'Basic Card'
        }
    },
    {
        path: 'creative-card',
        component: CreativeCardComponent,
        data: {
            title: 'Creative Card',
            breadcrumb: 'Creative Card'
        }
    },
    {
        path: 'timeline',
        component: TimelineComponent,
        data: {
            title: 'Timeline',
            breadcrumb: 'Timeline'
        }
    },
]