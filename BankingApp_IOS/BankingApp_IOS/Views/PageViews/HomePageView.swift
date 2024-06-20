//
//  HomePage.swift
//  BankingApp_IOS
//
//  Created by Lucas Hermes on 15.06.24.
//

import Foundation
import SwiftUI

struct HomePageView: View {

    @StateObject var homePageViewModel = HomePageViewModel()
    
    var body: some View {
        ZStack {
            ScrollViewReader { proxy in
                ScrollView(.vertical, showsIndicators: false) {
                    VStack(spacing: 15) {
                        ForEach(homePageViewModel.allAccounts, id: \.id) { account in
                            AccountPreviewView(accountDetail: account)
                        }
                    }
                    .padding()
                    .onAppear {
                        homePageViewModel.getAllAccounts()
                    }
                }
            }
            
            if(homePageViewModel.isPending) {
                LoadingSpinner()
            }
        }
    }
}
